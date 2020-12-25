import React, { useEffect, useState } from 'react'

import './Modals.css'


const ProfileModal = ({ modalOpen, setModalOpen, modalCategory, user }) => {
  const [modalClassname, setModalClassname] = useState('profile-modal')
  const [newUser, setNewUser] = useState({
    about: 'start',
    contact: {email: 'start', phone: 'start', location: 'start'},
    job: 'start',
    name: 'start',
    skills: {soft:'start', tech: 'start'}
  });


  useEffect(() => {
    if (modalOpen ) {
      // open modal
      setModalClassname('profile-modal show');
      // fill space
      setNewUser(user)
    }else {
      return setModalClassname('profile-modal close');
    }
    console.log('hey');
  }, [modalOpen, user])

  // functions
  const handleTextChange = (e) => {
    const {name, value} = e.target;

    if (newUser.contact.hasOwnProperty(name)) {
      setNewUser({...newUser, contact: {...newUser.contact, [name]: value}});
      console.log('11')

    }else if (newUser.skills.hasOwnProperty(name)) {
      setNewUser({...newUser, skills: {...newUser.skills, [name]: value.split(', ')}});
      console.log('22')

    }else {
      setNewUser({...newUser, [name]: value});
      console.log('33')
    }
    // console.log(name, ": ", value)
    // console.log("about state: ",newUser.about)
  }

  const infoModal =  <>
  <header>
    <h2> Edit user info</h2>
  </header>
  <div className="input-fields-container">
    <div className="custom-field">
      <input type="text" name="name" id="name" className="value-input" onChange={handleTextChange} value={newUser.job|| ''}  required/>
      <span className="placeholder">Name</span>
      <span className="border"></span>
    </div>
    <div className="custom-field">
      <input type="text" name="job" id="job" className="value-input" required/>
      <span className="placeholder">Job</span>
      <span className="border"></span>
    </div>
    <div className="custom-field">
      <input type="email" name="email" id="email" className="value-input" required/>
      <span className="placeholder">Email</span>
      <span className="border"></span>
    </div>
    <div className="custom-field">
      <input type="text" name="phone" id="phone" className="value-input" required/>
      <span className="placeholder">Phone</span>
      <span className="border"></span>
    </div>
    <div className="custom-field">
      <input type="text" name="location" id="location" className="value-input" required/>
      <span className="placeholder">Location</span>
      <span className="border"></span>
    </div>
    <div className="custom-field">
      <input type="file" name="resume" id="resume" className="value-input file-input" required/>
      <span className="placeholder">Resume</span>
      <span className="border"></span>
    </div>
    <div className="custom-field">
      <input type="file" name="avatar" id="avatar" className="value-input file-input" required/>
      <span className="placeholder">Avatar</span>
      <span className="border"></span>
    </div>
  </div>
  </>
  const aboutModal = <>
    <header>
      <h2> Edit About and Skillset</h2>
    </header>
    <div className="input-fields-container">
      <div className="custom-field">
        <textarea type="text" name="about" className="value-input" id="about" rows="10" onChange={handleTextChange} value={newUser.about|| ''} required ></textarea>
      <span className="placeholder">About</span>
        <span className="border"></span>
      </div>
      <div className="custom-field">
      <input type="text" name="tech" id="tech" className="value-input" required />
      <span className="placeholder">Technical skills</span>
      <span className="border"></span>
    </div>
    <div className="custom-field">
      <input type="text" name="soft" id="soft" className="value-input" required />
      <span className="placeholder">Soft skills</span>
      <span className="border"></span>
    </div>
    </div>
  </>

  return (
    <ModalContainer classname={modalClassname} setModalOpen={setModalOpen}>
      {/* {modal} */}
      {
        modalCategory === 'user_info'
        ? infoModal
        : aboutModal
      }
    </ModalContainer>
  )
}

const ModalContainer = ({ children, classname, setModalOpen }) => {
  return (
    <div className={`modal ${classname}`} >
      <div className="scrim" onClick={() => setModalOpen(false)}></div>
      <div className="modal-content">
        <form className="add-edit-project-form" autoComplete='off'>
          {children}
          <footer>
            <button type="button" onClick={() => setModalOpen(false)}> cancel</button>
            <button type="submit">
              Edit
            </button>
         </footer>
        </form>
      </div>
    </div>
  )
}
export default ProfileModal;
