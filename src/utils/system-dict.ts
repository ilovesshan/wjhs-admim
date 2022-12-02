import { SCache } from "./cache";

export function getStringByCode(code: string) {
  const systemDictList = SCache.get("systemDict");
  const finedDict = systemDictList.filter((item: any) => item.dictCode === code)[0]
  finedDict == null ? "未知" : finedDict.dictDescribe;
}