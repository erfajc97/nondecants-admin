export interface LoginPayload {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  name: string
  email: string
  role: string
}

export interface AuthTokenContent {
  access_token: string
  refresh_token: string
  user: AuthUser
}

export interface LoginResponse {
  content?: AuthTokenContent
  data?: AuthTokenContent
}
