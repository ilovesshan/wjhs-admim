export function calcCapacity(size: number): string {
  let kb = 1024
  let unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let i = Math.floor(Math.log(size) / Math.log(kb))
  return (size / Math.pow(kb, i)).toPrecision(3) + ' ' + unit[i];
}
