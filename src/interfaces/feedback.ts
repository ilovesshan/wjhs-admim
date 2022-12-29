import { IAttachment } from "@/interfaces/common";

export interface IFeedback {
  id: string,
  userId: string,
  userType: string,
  feedbackTitle: string,
  feedbackDetail: string,
  attachmentId: string,
  isSolve: string,
  attachment: IAttachment,
  isDelete: string,
  createTime: string,
}