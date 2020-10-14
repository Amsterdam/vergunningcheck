export const random = <T>(arr?: T[]): null | T => {
  if (!arr) {
    return null;
  }
  return arr[Math.floor(Math.random() * arr.length)] as null | T;
};
