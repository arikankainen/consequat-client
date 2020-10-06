import formatDate from './formatDate';

const parseDate = (input: string) => {
  let timestamp = Date.parse(input);

  if (isNaN(timestamp) === false) {
    return formatDate(timestamp.toString());
  }

  const from = /^(\d{4}).(\d{2}).(\d{2}).(\d{2}).(\d{2}).(\d{2})$/g;
  const to = '$1-$2-$3T$4:$5:$6.000Z';
  const converted = input.replace(from, to);

  timestamp = Date.parse(converted);

  if (isNaN(timestamp) === false) {
    return formatDate(timestamp.toString());
  }

  return input;
};

export default parseDate;
