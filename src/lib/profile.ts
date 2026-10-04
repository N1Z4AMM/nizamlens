import type { User } from '@supabase/supabase-js'

const RESERVED = new Set([
    'login', 'signup', 'welcome', 'admin', 'account', 'settings',
    'search', 'project', 'projects', 'photography', 'design',
])

function slugify(value: string) {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

export function getProfile(user: User) {
    const meta = user.user_metadata ?? {}
    const emailPrefix = user.email?.split('@')[0]

    const displayName: string =
        meta.full_name || meta.name || meta.user_name || emailPrefix || 'User'

    const rawUsername: string =
        meta.user_name || meta.preferred_username || emailPrefix || user.id.slice(0, 8)

    let username = slugify(rawUsername) || user.id.slice(0, 8)
    if (RESERVED.has(username)) username = `${username}-user`

    return {
        displayName,
        username,
        email: user.email,
        avatarUrl: (meta.avatar_url || meta.picture) as string | undefined,
    }
}