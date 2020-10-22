export const wildClass = (text: string) => {
  return `[class*="${text}"]`;
};

export const wait = (waitTime: number) => {
  return new Promise(resolve => setTimeout(resolve, waitTime));
};
