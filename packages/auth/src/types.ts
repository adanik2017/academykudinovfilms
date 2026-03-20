export type Role = 'superadmin' | 'tenant_admin' | 'curator' | 'mentor' | 'student'

export interface SessionUser {
  id: string
  authId: string
  email: string
  name: string
  role: Role
  avatarUrl: string | null
}
