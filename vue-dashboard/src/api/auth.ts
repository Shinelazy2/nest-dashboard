import type { LoginResponse } from './../interfaces/auth.interface'
import type { LoginInfo } from '@/interfaces/auth.interface'
import http from './http'

class AuthService {
  login(userid: string, password: string): Promise<LoginResponse> {
    return http.post('/login', {
      userid,
      password,
    })
  }
}

export default new AuthService()
