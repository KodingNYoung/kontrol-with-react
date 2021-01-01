import React from 'react';

import Card from './Card';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEye, faCodeBranch } from '@fortawesome/free-solid-svg-icons';

import './Cards.css';

const ProjectCard = ({ openEditModal, openDeleteModal, project }) => {
  const { id, project: { description, githubRepoLink, liveWebsiteLink, stacks, title }, url } = project;

  return (
    <Card classname="project-card" id={id}>
      {/* <div className="project-card" id={id}> */}
        <div className="main-content">
          <header className="title">{title}</header>
          <p className="stack">{stacks}</p>
          <img src={url} alt='project img'/>
          <p className="description">{description}</p>
          <div className="overlay">
            <button className="edit" onClick={() => openEditModal(project)}>
              <FontAwesomeIcon icon={faEdit}/>
            </button>
            <button className="delete">
              <FontAwesomeIcon icon={faTrashAlt} onClick={() => openDeleteModal(project)}/>
            </button>
          </div>
        </div>
        <footer>
            <a href={githubRepoLink} title="github repo" target="_blank" rel="noreferrer" >
              <FontAwesomeIcon icon={faCodeBranch} />
            </a>
            <a href={liveWebsiteLink} title="live site" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faEye} />
            </a>
        </footer>
      {/* </div> */}
    </Card>
  )
}

export default ProjectCard;
