import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: `${requestUrl.origin}/api/auth/callback`,
        },
    })

    if (error) {
        return NextResponse.redirect(`${requestUrl.origin}?error=${error.message}`)
    }

    return NextResponse.redirect(data.url)
}
