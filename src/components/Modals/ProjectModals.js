import React, { useState, useEffect, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch, faCogs, faEye, faImage, faInfo, faTag } from '@fortawesome/free-solid-svg-icons';

import Preloader from '../Preloader/Preloader';
import { UploadProgress, DeleteProgress } from '../ProgressBars/ProgressBars';

import './Modals.css';


const ProjectModal = ({ modalOpen, setModalOpen, modalAction, actionProject }) => {
  const [modalClass, setModalClass] = useState('modal');
  const [project, setProject] = useState({
    title: '',
    stacks: '',
    description: '',
    githubRepoLink: '',
    liveWebsiteLink: ''
  })
  const [image, setImage] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectId, setProjectId] = useState('');
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)


  const imageRef = useRef();

  useEffect(() => {
    if (modalOpen) {
      setModalClass('modal show');
      // check if it action is to edit
      if (modalAction === 'edit') {
        setModalInput(actionProject);
        setProjectId(actionProject.id);
      }else if (modalAction === 'delete') {
        setProjectTitle(actionProject.project.title);
        setProjectId(actionProject.id);
      }
    } else {
      setModalClass('modal close');
      clearModalInputs();
    } 
  }, [modalOpen, modalAction, actionProject ]) 
  

  // function
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    // set the project property
    setProject({...project, [name]:value})
  }
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(selected);

      fileReader.addEventListener('load', (e) => {
        setPreviewImg(<img src={e.target.result} alt=""/>);
      })
      setImage(selected);
    }
  }
  const setModalInput = (actionProject) => {
    const { project: { title, stacks, description, githubRepoLink, liveWebsiteLink }, url } = actionProject;
    
    setProject({ title, stacks, description, githubRepoLink, liveWebsiteLink })
    setPreviewImg(<img src={url} alt=""/>)
  }
  const clearModalInputs = () => {
    setProject({
      title: '',
      stacks: '',
      description: '',
      githubRepoLink: '',
      liveWebsiteLink: ''
    })
    setImage(null);
    setPreviewImg(null);
    if (imageRef.current) {
      imageRef.current.value = "";
    }
  }
  const handleModalFormSubmit = (e) => {
    e.preventDefault();

    if (modalAction === 'add') {
      console.log('Just added a new project woooahh!!!')
    }else if (modalAction === 'edit' && !image) {
      console.log('editted an existing project without changing the photo.')
    }else if (modalAction === "edit" && image) {
      console.log('editted an existing project with a different photo.')
    }
    setUploading(true);
  }
  const handleProjectDeleteAction = (e) => {
    e.preventDefault();

    setDeleting(true);
    console.log('deleted a project! ;(')
  }
  const addEditModal = <form className="add-edit-project-form" autoComplete='off' onSubmit={handleModalFormSubmit}>
      <div className="image-input-area">
        <div className="icon">
          <FontAwesomeIcon icon={faImage} />
        </div>
        {previewImg}
        <input type="file" name="image" accept="image/*" id="image" className="value-input image-input" onChange={handleFileChange} ref={imageRef} required={modalAction==='add'? true : false} />
      </div>
      <header>
        <h2>{modalAction} project</h2>
      </header>
      <div className="input-fields-container">
      <div className="custom-field">
        <label htmlFor="title" className="icon">
          <FontAwesomeIcon icon={faTag}/>
        </label>
        <input type="text" name="title" id="title" className="value-input" value={project.title} onChange={handleTextChange} required/>
        <span className="placeholder">Title</span>
        <span className="border"></span>
      </div>
      <div className="custom-field">
        <label htmlFor="stacks" className="icon">
          <FontAwesomeIcon icon={faCogs} />
        </label>
        <input type="text" name="stacks" id="stacks" className="value-input" value={project.stacks} onChange={handleTextChange} required />
        <span className="placeholder">Technologies used</span>
        <span className="border"></span>
      </div>
      <div className="custom-field">
        <label htmlFor="description" className="icon">
          <FontAwesomeIcon icon={faInfo} />
        </label>
        <textarea type="text" name="description" className="value-input" id="description" value={project.description} onChange={handleTextChange} required ></textarea>
        <span className="placeholder">Description</span>
        <span className="border"></span>
      </div>
      <div className="links-row">
      <div className="custom-field">
        <label htmlFor="githubRepoLink" className="icon">
          <FontAwesomeIcon icon={faCodeBranch}/>
        </label>
        <input type="text" name="githubRepoLink" id="githubRepoLink" className="value-input" value={project.githubRepoLink} onChange={handleTextChange} required />
        <span className="placeholder">GitHub Repo link</span>
        <span className="border"></span>
      </div>
      <div className="custom-field">
        <label htmlFor="liveWebsiteLink" className="icon">
          <FontAwesomeIcon icon={faEye} />
        </label>
        <input type="text" name="liveWebsiteLink" id="liveWebsiteLink" className="value-input" value={project.liveWebsiteLink} onChange={handleTextChange} required/>
        <span className="placeholder">Live website link</span>
        <span className="border"></span>
      </div>

      </div>
      </div>
      <footer>
        <button type="button" onClick={() => setModalOpen(false)} disabled={uploading}> cancel</button>
        <button type="submit" disabled={uploading}>
        {uploading ?<Preloader color='#ccc' size={10} border={2} /> :`${modalAction} project`}
        </button>
      </footer>
  </form>

  const deleteModal = <div className="delete-project-modal">
    <header>
        <h2>{modalAction} project</h2>
    </header>
    <div className="delete-modal-body">
      Do you want to delete <span className="project-name">{projectTitle}</span> from your list of projects?
    </div>
    <footer>
      <button type="button" onClick={() => setModalOpen(false)} disabled={deleting}> cancel</button>
      <button type="button" onClick={handleProjectDeleteAction} disabled={deleting}>
        {deleting ? <Preloader color='#ccc' size={10} border={2} /> :`${modalAction} project`}
      </button>
    </footer>
  </div>

  return (
    <div className={modalClass}>
      <div className="scrim" onClick={() => setModalOpen(false)}></div>
      <div className="modal-content">
        {
        modalAction === "delete"
        ? deleteModal
        : addEditModal
        }
        {uploading && <UploadProgress image={image} project={project} setModalOpen={setModalOpen} setUploading={setUploading} action={modalAction} actionProjectId = {projectId}/>}
        {deleting && <DeleteProgress setModalOpen={setModalOpen} setDeleting={setDeleting} actionItemId = {projectId} collection='projects'/>}
      </div>
    </div>
  )
}

export default ProjectModal