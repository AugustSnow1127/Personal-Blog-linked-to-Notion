import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const supabase = await createClient();

    // Get comments order by created_at desc
    const { data: comments, error } = await supabase
        .from("post_comments")
        .select("*")
        .eq("post_slug", slug)
        .order("created_at", { ascending: false });

    if (error) {
        // If table doesn't exist yet, returning empty array is better than 500
        if (error.code === '42P01') {
            return NextResponse.json([]);
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(comments);
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const supabase = await createClient();

    // Check auth
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const content = body.content?.trim();

        if (!content) {
            return NextResponse.json({ error: "Content is required" }, { status: 400 });
        }

        if (content.length > 1000) {
            return NextResponse.json({ error: "Content is too long (max 1000 characters)" }, { status: 400 });
        }

        // Prepare user metadata to store with comment
        const userName = user.user_metadata?.user_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous';
        const avatarUrl = user.user_metadata?.avatar_url;

        const { data, error } = await supabase
            .from("post_comments")
            .insert({
                post_slug: slug,
                user_id: user.id,
                content: content,
                user_name: userName,
                avatar_url: avatarUrl
            })
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (e) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
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

    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get('id');

    if (!commentId) {
        return NextResponse.json({ error: "Comment ID is required" }, { status: 400 });
    }

    const { error } = await supabase
        .from("post_comments")
        .delete()
        .eq("id", commentId)
        .eq("user_id", user.id); // Ensure user owns the comment

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
