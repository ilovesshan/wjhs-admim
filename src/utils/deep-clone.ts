export function deepClone<T>(data: object): T {
  return JSON.parse(JSON.stringify(data));
}