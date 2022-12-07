export function deepClone<T>(data: object): T {
  return JSON.parse(JSON.stringify(data));
}


// export function deepClone<T>(source: Object): T {
//   if (null == source || {} == source || [] == source) {
//     return source as T;
//   }

//   let newObject: any;
//   let isArray = false;
//   if ((source as any).length) {
//     newObject = [];
//     isArray = true;
//   }
//   else {
//     newObject = {};
//     isArray = false;
//   }

//   for (let key of Object.keys(source)) {
//     if (null == source[key]) {
//       if (isArray) {
//         newObject.push(null);
//       }
//       else {
//         newObject[key] = null;
//       }
//     }
//     else {
//       let sub = (typeof source[key] == 'object') ? deepClone(source[key]) : source[key];
//       if (isArray) {
//         newObject.push(sub);
//       }
//       else {
//         newObject[key] = sub;
//       }
//     }
//   }
//   return newObject;
// }