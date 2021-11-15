const checkTokenType = (desired: string, actual: string): boolean => desired === actual;

export const isBlockOpen = (actual: string): boolean => checkTokenType('OpenBrace', actual);
export const isBlockClose = (actual: string): boolean => checkTokenType('ClosingBrace', actual);
