import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const supabase = await createClient();

    // Get total count
    const { count, error: countError } = await supabase
        .from("post_likes")
        .select("*", { count: "exact", head: true })
        .eq("post_slug", slug);

    if (countError) {
        return NextResponse.json({ error: countError.message }, { status: 500 });
    }

    // Get current user status
    const { data: { user } } = await supabase.auth.getUser();
    const userLiked = user ? !!(await supabase
        .from("post_likes")
        .select("id")
        .eq("post_slug", slug)
        .eq("user_id", user.id)
        .single()
    ).data : false;

    return NextResponse.json({
        count,
        userLiked
    });
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { error } = await supabase
        .from("post_likes")
        .insert({
            post_slug: slug,
            user_id: user.id
        });

    if (error) {
        if (error.code === '23505') { // Unique violation
            return NextResponse.json({ error: "Already liked" }, { status: 400 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { error } = await supabase
        .from("post_likes")
        .delete()
        .eq("post_slug", slug)
        .eq("user_id", user.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
