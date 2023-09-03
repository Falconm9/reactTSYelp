export function encodeString(text: string): string {
  const encodedText = Buffer.from(text).toString('base64');
  console.log(encodedText)
  return encodedText;
}

export function decodeString(encodedText: string): string {
  const decodedText = Buffer.from(encodedText, 'base64').toString('utf8');
  console.log(decodedText)
  return decodedText;
}