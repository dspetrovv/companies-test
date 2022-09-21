import { CHANGE_MODAL_VALIDATION, CHANGE_MODAL_VISIBILITY } from "../../types";

export function changeModalValidation(isValid) {
  return {
    type: CHANGE_MODAL_VALIDATION,
    payload: {
      isValid
    }
  };
}

/**
 * Open/Close modal window
 * @param {Boolean} isOpened Is modal opened
 * @param {JSX|null} modalBody Modal body (null by default)
 * @param {Boolean} isValid Can I use accept button (false by default)
 * @param {Function} acceptFunction Function on accept-button click
 * @returns An object with fields: "type" with predefined type and "payload" that includes all incoming params
 */
export function changeModalVisibility(isOpened, modalBody = null, isValid = false, acceptFunction) {
  return {
    type: CHANGE_MODAL_VISIBILITY,
    payload: {
      isOpened,
      modalBody,
      isValid,
      acceptFunction
    }
  };
}