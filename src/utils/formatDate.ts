const pad = (input: number): string => {
  if (input < 10) return `0${input}`;
  return `${input}`;
};

const formatDate = (input: Date | undefined): string => {
  if (input) {
    const date = new Date(Number(input));
    const customizedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    const customizedTime = `${date.getHours()}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

    return `${customizedDate} ${customizedTime}`;
  } else return '';
};

export default formatDate;
