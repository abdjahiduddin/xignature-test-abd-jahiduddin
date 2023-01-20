export interface SignUpResponse {
  id: string;
  status: string;
  message: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface JwtPayload {
  id: string;
  username: string;
  created_at: string;
}
