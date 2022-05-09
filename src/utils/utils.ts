export const decodeBase64 = (input: string): string => {
  const buff = Buffer.from(input, 'base64');
  return buff.toString('ascii');
};
