export const parseFNumber = (input: string) => {
  if (input === '') {
    return null;
  }
  if (input.toLowerCase().includes('f/')) {
    return input;
  }
  if (input.toLowerCase().includes('/1')) {
    return `f/${input.replace('/1', '')}`;
  }
  return input;
};

export const parseIso = (input: string) => {
  if (input === '') {
    return null;
  }
  return `ISO ${input}`;
};

export const parseShutter = (input: string) => {
  if (input === '') {
    return null;
  }
  if (input.toLowerCase().includes('1/0')) {
    return '';
  }
  return input;
};

export const parseFocal = (input: string) => {
  if (input === '') {
    return null;
  }
  if (input.toLowerCase().includes('mm')) {
    return input.replace(' mm', 'mm');
  }
  if (input.toLowerCase().includes('/1')) {
    return `${input.replace('/1', '')}mm`;
  }
  return input;
};

export const parseFlash = (input: string) => {
  const yes = 'Flash fired';
  const no = 'No flash';

  if (input === '') {
    return null;
  }
  if (input.toLowerCase().includes('fired: false')) {
    return no;
  }
  if (input.toLowerCase().includes('did not fire')) {
    return no;
  }
  if (input.toLowerCase().includes('fired')) {
    return yes;
  }
  return no;
};

export const parseCamera = (make: string, model: string) => {
  if (model === '') {
    return null;
  }
  if (model.toLowerCase().includes(make.toLowerCase())) {
    return model;
  }
  return `${make} ${model}`;
};
