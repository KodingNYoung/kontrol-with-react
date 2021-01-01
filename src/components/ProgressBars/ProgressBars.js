import React, { useEffect } from "react";

import useStorageToAddAndEdit from "../../firebase/hooks/useStorageToAddAndEdit";
import useFirestoreToDelete from "../../firebase/hooks/useFirestoreToDelete";
import useStorageToUploadUserDetails from "../../firebase/hooks/useStorageToUploadUserDetails";
import { useAuthToAddAdmin } from "../../firebase/hooks/useAuth";

import "./ProgressBar.css";

const AddAdminProgress = ({
  email,
  password,
  setAddingAdmin,
  closeModal,
  setError,
}) => {
  const { done, error } = useAuthToAddAdmin(email, password);

  const style = {
    width: `${done ? 100 : 0}%`,
  };
  useEffect(() => {
    setError(error);
  });

  return (
    <ProgressBar
      style={style}
      closeModal={closeModal}
      setAction={setAddingAdmin}
      complete={done}
    />
  );
};

const UserDetailSubmitProgress = ({
  avatar,
  resume,
  userDetails,
  setSubmit,
  closeModal,
}) => {
  // make a request to firebase
  const { progress, done } = useStorageToUploadUserDetails(
    { avatar, resume },
    userDetails
  );

  const style = {
    width: isNaN(progress) ? "50%" : `${progress}%`,
    maxWidth: "100%",
  };

  return (
    <ProgressBar
      style={style}
      closeModal={closeModal}
      setAction={setSubmit}
      complete={done}
    />
  );
};

const UploadProgress = ({
  image,
  project,
  setModalOpen,
  setUploading,
  action,
  actionProjectId,
}) => {
  const { progress } = useStorageToAddAndEdit(
    project,
    image,
    action,
    actionProjectId
  );

  const style = {
    width: `${progress}%`,
    maxWidth: "100%",
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <ProgressBar
      style={style}
      closeModal={closeModal}
      setAction={setUploading}
      complete={progress >= 100}
    />
  );
};

const DeleteProgress = ({
  setModalOpen,
  setDeleting,
  actionItemId,
  collection,
}) => {
  const { done } = useFirestoreToDelete(actionItemId, collection);

  const style = {
    width: `${done ? 100 : 0}%`,
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <ProgressBar
      style={style}
      closeModal={closeModal}
      setAction={setDeleting}
      complete={done}
    />
  );
};

const ProgressBar = ({ style, closeModal, setAction, complete }) => {
  useEffect(() => {
    if (complete) {
      setTimeout(() => {
        // close modal
        closeModal();

        //lastly set upload to false
        setAction(false);
      }, 300);
    }
  }, [complete, closeModal, setAction]);

  return <div className="progress-bar" style={style} />;
};

export {
  UploadProgress,
  DeleteProgress,
  UserDetailSubmitProgress,
  AddAdminProgress,
};
