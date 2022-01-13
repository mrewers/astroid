export const mockWords = {
  first: {
    binary: '1 0 000 1',
    morse: '- . ... -',
    text: 'test',
  },
  second: {
    binary: '00 10 0110 001 1',
    morse: '.. -. .--. ..- -',
    text: 'input',
  },
  third: {
    binary: '011 111 010 100 000',
    morse: '.-- --- .-. -.. ...',
    text: 'words',
  },
};

export const mockInputMorse = `${mockWords.first.morse} / ${mockWords.second.morse} / ${mockWords.third.morse}`;
export const mockInputText = `${mockWords.first.text} ${mockWords.second.text} ${mockWords.third.text}`;
