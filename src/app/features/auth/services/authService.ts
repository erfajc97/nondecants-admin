import { API_ENDPOINTS } from '@/app/api/endpoints'
import axiosInstance from '@/app/config/axiosConfig'
import type { LoginPayload, LoginResponse } from '../types'

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await axiosInstance.post<LoginResponse>(API_ENDPOINTS.LOGIN, payload)
    return data
  },
}
