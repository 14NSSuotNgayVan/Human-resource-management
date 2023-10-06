export const validCode = [200,201];

export const checkResponseCode = (code) => {
    return validCode.includes(code) || false;
  };