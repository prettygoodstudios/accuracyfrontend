import React from 'react';

export const Modal = (props) => {
  const {dismissModal, submitModal, children} = props;
  document.addEventListener('keypress', (e) => {
    if(e.keyCode == 13){
      submitModal();
    }
  });
  return(
    <div className="modal-mask">
      <div className="modal">
        {children}
        <div className="modal__actions">
          <a onClick={dismissModal}>{submitModal ? 'Cancel' : 'Dismiss'}</a>
          {submitModal && <a onClick={submitModal}>Submit</a>}
        </div>
      </div>
    </div>
  );
}

export default Modal;
