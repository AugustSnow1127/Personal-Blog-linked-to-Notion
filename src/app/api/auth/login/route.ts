import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)
    const provider = requestUrl.searchParams.get('provider') as 'github' | 'google' || 'github'
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: `${requestUrl.origin}/api/auth/callback`,
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
        },
    })

    if (error) {
        return NextResponse.redirect(`${requestUrl.origin}?error=${error.message}`)
    }

    return NextResponse.redirect(data.url)
}
