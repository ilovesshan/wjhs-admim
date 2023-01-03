export interface IApk {
  id: string;
  updateStatus: string;
  versionCode: number;
  versionName: string;
  major: number;
  minor: number;
  patch: number;
  modifyContent: string;
  downloadUrl: string;
  apkSize: number;
  apkMd5: string;
  isDelete: string;
  createTime: string;
}

export interface ICreateApk {
  updateStatus: string;
  versionCode: number;
  versionName: string;
  major: number;
  minor: number;
  patch: number;
  modifyContent: string;
  apkSize: number;
  apkMd5: string;
  file: any,
}
