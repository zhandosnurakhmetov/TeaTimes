import { CHANGE_TEXT_SIZE } from './types';

export function changeTextSize(textSize) {
  return {
    type: CHANGE_TEXT_SIZE,
    textSize
  };
}
