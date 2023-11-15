export const build = (data, retCode = 20000, retInfo = '', success = true) => {
  return {
    retCode,
    retInfo,
    success,
    timeStamp: Number(new Date()),
    ...data
  };
};