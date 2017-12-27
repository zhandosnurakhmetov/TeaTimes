import { CHANGE_LANGUAGE } from './types';

export function changeLanguage(language) {
  let lng = 'EN';

  switch (language) {
    case 'English':
      lng = 'EN';
      break;
    case 'Russian':
      lng = 'RU';
      break;
    case 'Kazakh':
      lng = 'KZ';
      break;
    case 'Turkish':
      lng = 'TK';
      break;
    default:
      break;
  }

  return {
    type: CHANGE_LANGUAGE,
    language: lng
  };
}
