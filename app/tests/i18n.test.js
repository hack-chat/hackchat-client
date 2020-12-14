/**
 * Test internationalization
 */

import { formatTranslationMessages } from '../i18n';

jest.mock('../translations/en.json', () => ({
  message1: `ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn`,
  message2: 'uWu Test me daddy',
}));

const cthulhuTranslationMessages = {
  message1: 'Get ready for some shokushu zeme',
  message2: '',
};

describe('formatTranslationMessages', () => {
  it('should build only defaults when DEFAULT_LOCALE', () => {
    const result = formatTranslationMessages('en', { a: 'a' });

    expect(result).toEqual({ a: 'a' });
  });

  it('should combine default locale and current locale when not DEFAULT_LOCALE', () => {
    const result = formatTranslationMessages('', cthulhuTranslationMessages);

    expect(result).toEqual({
      message1: 'Get ready for some shokushu zeme',
      message2: 'uWu Test me daddy',
    });
  });
});
