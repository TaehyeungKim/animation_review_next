export type UserBadge = {
    id: number
    name: string
}

export type LoggedUserInfo = {
    id: string,
    profileImage: string,
    badge: UserBadge
}