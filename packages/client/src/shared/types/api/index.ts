import type { UserModel } from '@/shared/types/model'

export interface RequestError {
  reason: string
}

export type AvatarRequest = FormData

export type AvatarResponse = UserModel

export type ChangeUserRequest = Omit<UserModel, 'id' | 'avatar'>

export type ChangeUserResponse = UserModel

export interface YandexRequest {
  code: string
  redirect_uri: string
}

export interface ServiceIdResponse {
  service_id: string
}
