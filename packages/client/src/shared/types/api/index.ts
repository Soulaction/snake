import type { UserModel } from '@/shared/types/model'

export interface IRequestError {
  reason: string
}

export type AvatarRequest = FormData

export type AvatarResponse = UserModel

export type ChangeUserRequest = Omit<UserModel, 'id' | 'avatar'>

export type ChangeUserResponse = UserModel

export interface IYandexRequest {
  code: string
  redirect_uri: string
}

export interface IServiceIdResponse {
  service_id: string
}

export interface IChangePasswordDTO {
  oldPassword: string
  newPassword: string
}
