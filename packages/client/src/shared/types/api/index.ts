import type { UserModel } from '@/shared/types/model'

export interface RequestError {
  reason: string
}

export type avatarRequest = FormData

export type avatarResponse = UserModel

export type changeUserRequest = Omit<UserModel, 'id' | 'avatar'>

export type changeUserResponse = UserModel

export interface YandexRequest {
  code: string
  redirect_uri: string
}

export interface ServiceIdResponse {
  service_id: string
}
