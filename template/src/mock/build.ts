export const build = <T>(data: T, retCode: number = 20000, retInfo: string = '', success: boolean = true) => {
  return {
    retCode,
    retInfo,
    success,
    timeStamp: Number(new Date()),
    ...data
  };
};