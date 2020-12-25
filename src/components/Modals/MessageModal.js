import React, { useState, useEffect } from 'react';
import useFirestoreToEdit from '../../firebase/hooks/useFirestoreToEdit';

import { DeleteProgress } from '../ProgressBars/ProgressBars';

import './Modals.css';


const MessageModal = ({ modalOpen, setModalOpen, selectedMessage }) => {
  const [modalClassname, setModalClassname] = useState('modal message-modal')
  const [deleting, setDeleting] = useState(false);
  const { createdAt, email, id, messageText, name } = selectedMessage;

  useFirestoreToEdit( id, 'messages', { read: true}); 

  useEffect(() => {
    if (modalOpen) {
      setModalClassname('modal message-modal show');

    }else {
      setModalClassname('modal message-modal close')
    }
    
  }, [modalOpen])
  
  // functions
  const deleteMessage = () => {
    setDeleting(true);
  }

  return (
    <div className={modalClassname}>
      <div className="scrim" onClick={() => setModalOpen(false)}></div>
      <div className="modal-content">
      {
        selectedMessage
        ? <>
            <h2>{name}</h2>
            <h5>{email}</h5>
            <small>{`${createdAt.date} at ${createdAt.time}`}.</small>
            <p>{messageText}</p>
          </>
        : null
      }
        <footer>
          <button className="danger" onClick={deleteMessage}>delete message</button>
          <button className="action" onClick={() => setModalOpen(false)}>OK</button>
        </footer>
        {deleting && <DeleteProgress setModalOpen={setModalOpen} setDeleting={setDeleting} actionItemId = {id} collection='messages'/>}
      </div>
    </div>
  )
}

export default MessageModal;