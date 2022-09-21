import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeModalVisibility } from '../store/reducers/modal/actionCreator';

function ModalWindow() {
  let isValid = useSelector(state => state.modal.isValid); //state.isValid
  let isOpened = useSelector(state => state.modal.isOpened); //state.isOpened
  let modalBody = useSelector(state => state.modal.modalBody);
  let acceptFunction = useSelector(state => state.modal.acceptFunction);
  const dispatch = useDispatch();

  function acceptResult() {
    acceptFunction();
  }
  function closeModal() {
    return dispatch(changeModalVisibility(false))
  }

  return (
    <div
      className={`modal ${!isOpened ? 'modal_hidden' : ''}`}
      onClick={() => closeModal()}
    >
      <div
        className={`modal__window ${!isOpened ? 'modal__window_hidden' : '' }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={"modal__title"}>
          <h3>Заголовок</h3>
          <div className={"modal__close-icon"} onClick={() => closeModal()}></div>
        </div>
        <div className={"modal__body"}>
          { modalBody }
        </div>
        <div className={"modal__footer"}>
          <button
            className={`btn modal__save-btn ${!isValid ? 'btn_disabled' : '' }`}
            disabled={!isValid}
            onClick={() => acceptResult()}
          >
            Сохранить
          </button>
          <button
            className={"btn modal__close-btn"}
            onClick={() => closeModal()}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalWindow;