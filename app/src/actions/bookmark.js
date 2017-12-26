import { BOOKMARK_PRESSED } from './types';

export function bookmarkPressed(isSelected) {
  return {
    type: BOOKMARK_PRESSED,
    isSelected: !isSelected
  };
}
