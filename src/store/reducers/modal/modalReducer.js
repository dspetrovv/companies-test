import { CHANGE_MODAL_VALIDATION, CHANGE_MODAL_VISIBILITY } from "../../types";

const initialState = {
  modalBody: <div></div>,
  acceptFunction: () => {},
  isValid: false,
  isOpened: false,
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MODAL_VALIDATION:
      return { ...state, isValid: action.payload.isValid };
    case CHANGE_MODAL_VISIBILITY:
      return {
        ...state,
        isOpened: action.payload.isOpened,
        modalBody: action.payload.modalBody,
        isValid: action.payload.isValid,
        acceptFunction: action.payload.acceptFunction
      };
    default:
      return state;
  }
}