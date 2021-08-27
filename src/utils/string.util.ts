export const isset = (string: any) => {
  if (typeof string === 'string') {
    return string.trim().length > 0;
  } else {
    return !(typeof string === 'undefined' || string === null);
  }
};
