export function encodeString(text: string): string {
  const encodedText = Buffer.from(text).toString('base64');
  return encodedText;
}

export function decodeString(encodedText: string): string {
  const decodedText = Buffer.from(encodedText, 'base64').toString('utf8');
  return decodedText;
}