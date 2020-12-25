import React, { useEffect } from 'react'

import useStorageToAddAndEdit from '../../firebase/hooks/useStorageToAddAndEdit';
import useFirestoreToDelete from '../../firebase/hooks/useFirestoreToDelete';

import './ProgressBar.css';

const UploadProgress = ({ image, project, setModalOpen, setUploading, action, actionProjectId }) => {
  const { progress } = useStorageToAddAndEdit(project, image, action, actionProjectId); 

  const style={
    width: `${progress}%`,
    maxWidth: '100%',
  }

  return <ProgressBar style={style} setModalOpen={setModalOpen} setAction={setUploading} complete={progress >= 100} />
}

const DeleteProgress = ({ setModalOpen, setDeleting, actionItemId, collection }) => {
  const { done } = useFirestoreToDelete(actionItemId, collection); 

  const style={
    width: `${done ? 100 : 0}%`,
  }
  
  return <ProgressBar style={style} setModalOpen={setModalOpen} setAction={setDeleting} complete={done} />
}

const ProgressBar = ({ style, setModalOpen, setAction, complete }) => {
  useEffect(() => {
    if (complete){
      setTimeout(() => {
        // close modal
        setModalOpen(false);

        //lastly set upload to false
        setAction(false);
      }, 300)
    }
  }, [complete, setModalOpen, setAction])

  return <div className="progress-bar" style={style}></div>
}

export { UploadProgress, DeleteProgress };
