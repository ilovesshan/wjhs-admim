export interface IInsertOrUpdateUser {
  id?: string
  attachmentId: string,
  gender: string,
  nickName: string,
  password: string,
  phone: string,
  userType: string | null,
  username: string
}