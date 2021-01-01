import React, { useEffect, useState } from "react";

import Preloader from "../Preloader/Preloader";

import { UserDetailSubmitProgress } from "../ProgressBars/ProgressBars";

import "./Modals.css";

const DashboardModal = ({
  modalOpen,
  closeModal,
  userDetails,
  modalCategory,
}) => {
  const [modalClass, setModalClass] = useState("profile-modal");
  const [user, setUser] = useState({
    name: "",
    job: "",
    about: "",
    contact: { email: "", phone: "", location: "" },
    skills: { soft: "", tech: "" },
  });
  const [resume, setResume] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (modalOpen && userDetails.name) {
      setModalClass("profile-modal show");
      fillUserState(userDetails);
    } else {
      setSubmit(false);
      setModalClass("profile-modal close");
      clearUserState();
    }
  }, [modalOpen, userDetails]);

  const fillUserState = (details) => {
    setUser({
      ...details,
    });
  };
  const clearUserState = () => {
    setUser({
      name: "",
      job: "",
      about: "",
      contact: { email: "", phone: "", location: "" },
      skills: { soft: "", tech: "" },
    });
  };
  const handleTextChange = (e) => {
    const { name, value } = e.target;

    if (name === "email" || name === "phone" || name === "location") {
      return setUser({ ...user, contact: { ...user.contact, [name]: value } });
    }
    if (name === "soft" || name === "tech") {
      return setUser({
        ...user,
        skills: { ...user.skills, [name]: value },
      });
    }

    return setUser({ ...user, [name]: value });
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;

    const setFileState = (setter, file) => {
      if (file) {
        setter(file);
      } else {
        setter(null);
      }
    };

    if (name === "resume") {
      // handle for resume
      setFileState(setResume, files[0]);
    } else {
      // handle for avatar
      setFileState(setAvatar, files[0]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
  };

  // constants
  const infoModal = (
    <>
      <header>
        <h2>Edit user info</h2>
      </header>
      <div className="input-fields-container">
        <div className="custom-field">
          <input
            type="text"
            name="name"
            className="value-input"
            value={user.name}
            onChange={handleTextChange}
            required
          />
          <div className="placeholder">Name</div>
          <div className="border"></div>
        </div>
        <div className="custom-field">
          <input
            type="text"
            name="job"
            className="value-input"
            value={user.job}
            onChange={handleTextChange}
            required
          />
          <div className="placeholder">Job</div>
          <div className="border"></div>
        </div>
        <div className="custom-field">
          <input
            type="text"
            name="email"
            className="value-input"
            value={user.contact.email}
            onChange={handleTextChange}
            required
          />
          <div className="placeholder">Email</div>
          <div className="border"></div>
        </div>
        <div className="custom-field">
          <input
            type="text"
            name="phone"
            className="value-input"
            value={user.contact.phone}
            onChange={handleTextChange}
            required
          />
          <div className="placeholder">Phone</div>
          <div className="border"></div>
        </div>
        <div className="custom-field">
          <input
            type="text"
            name="location"
            className="value-input"
            value={user.contact.location}
            onChange={handleTextChange}
            required
          />
          <div className="placeholder">Location</div>
          <div className="border"></div>
        </div>
        <div className="custom-field">
          <input
            type="file"
            name="resume"
            className="value-input file-input"
            onChange={handleFileChange}
            accept="application/pdf"
          />
          <div className="placeholder">Resume</div>
          <div className="border"></div>
        </div>
        <div className="custom-field">
          <input
            type="file"
            name="avatar"
            className="value-input file-input"
            onChange={handleFileChange}
            accept="image/*"
          />
          <div className="placeholder">Avatar</div>
          <div className="border"></div>
        </div>
      </div>
    </>
  );
  const aboutModal = (
    <>
      <header>
        <h2>Edit user info</h2>
      </header>
      <div className="input-fields-container">
        <div className="custom-field">
          <input
            type="text"
            name="tech"
            className="value-input"
            value={user.skills.tech}
            onChange={handleTextChange}
            required
          />
          <div className="placeholder">Technical skills</div>
          <div className="border"></div>
        </div>
        <div className="custom-field">
          <input
            type="text"
            name="soft"
            className="value-input"
            value={user.skills.soft}
            onChange={handleTextChange}
            required
          />
          <div className="placeholder">Soft skills</div>
          <div className="border"></div>
        </div>
        <div className="custom-field">
          <textarea
            name="about"
            className="value-input"
            rows="10"
            value={user.about}
            onChange={handleTextChange}
            required
          ></textarea>
          <span className="placeholder">About</span>
          <span className="border"></span>
        </div>
      </div>
    </>
  );

  return (
    <div className={`modal ${modalClass}`}>
      <div className="scrim" onClick={closeModal}></div>
      <div className="modal-content">
        <form
          className="edit-user-detail-form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          {modalCategory === "info" ? infoModal : aboutModal}
          <footer>
            <button type="button" onClick={closeModal} disabled={submit}>
              cancel
            </button>
            <button type="submit" disabled={submit}>
              {submit ? (
                <Preloader color="#ccc" size={10} border={2} />
              ) : (
                `edit`
              )}
            </button>
          </footer>
        </form>
        {submit && (
          <UserDetailSubmitProgress
            avatar={avatar}
            resume={resume}
            userDetails={user}
            closeModal={closeModal}
            setSubmit={setSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardModal;
