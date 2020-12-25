import React, { useState, useEffect} from 'react';
import useFireStoreToGetDatum from '../firebase/hooks/useFirestoreToGetDatum';

import Card from '../components/Cards/Card';
import Error from './Error';
import Preloader from '../components/Preloader/Preloader';
import ProfileModal from '../components/Modals/ProfileModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import '../Panel.css'

import avatar from '../img/avatar.png'


const Profile = ({ user }) => {
  const { doc, error } = useFireStoreToGetDatum('dashboard', 'abiodunadebambo44@gmail.com');

  const [dashboardDetails, setDashboardDetails] = useState({});
  const[errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  // modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState(null);

  useEffect(() => {
    if (doc) {
      setDashboardDetails(doc);
      
    }else if (error) {
      setErrors(error);
    }
    setTimeout(() => setLoading(false), 1000);
  }, [doc, error])
  
  //functions 
  const isEmpty = object => {
    for ( const prop in object ) {
      if (object.hasOwnProperty(prop)) {
        return false;
      }
    }

    return JSON.stringify(object) === JSON.stringify({});
  }
  
  return (
    <section>
    {/* if there is an error */}
    {(errors && !loading && isEmpty(dashboardDetails)) && <Error message={errors} title="Oops!!!" mood=":("/>}
    {/* while loading */}
    {loading && <Preloader size={100} border={10} color='#446df6d6'/>}
    {/* displaying the user data */}
      <main className="dashboard">
        { (dashboardDetails.counts && !loading) &&
          <>
            <div className="left column">
              <UserInfo info={dashboardDetails} setModalOpen={setModalOpen} setModalCategory={setModalCategory}/>
            </div>
            <div className="right column">
              <About info={dashboardDetails} setModalOpen={setModalOpen} setModalCategory={setModalCategory}/>
              {/* <Skillset info={dashboardDetails} setModalOpen={setModalOpen} setModalCategory={setModalCategory}/> */}
            </div>      
          </>
        }
        { <ProfileModal modalOpen={modalOpen} setModalOpen={setModalOpen} modalCategory={modalCategory}
        user={dashboardDetails} />}
      </main>
    </section>
  )
}

const UserInfo = ({ info, setModalOpen, setModalCategory }) => {
  const { name, job, counts, contact, resume_link } = info;

  const onEditBtnClick = () => {
    setModalCategory("user_info");
    setModalOpen(true)
  }
  
  const makeElementArray = detailObject => {
    const array = [];
    for (const key in detailObject) {
      array.push(<Item label={key} value={detailObject[key]} key={detailObject[key]}/>);
    }
    return array;
  }
  return (
    <Card>
      <div className="content-container user-info">
        <div className="avatar">
          <img src={avatar} alt=""/>
        </div>
        <h2 className="name">{name}</h2>
        <span className="job">{job}</span>
        <div className="item-numbers">
          {
            makeElementArray(counts)
          }
        </div>
        {
          makeElementArray(contact)
        }

        <a href={resume_link} target="_blank" rel="noreferrer" className="resume">Résumé</a>

        <button className="edit-btn" onClick={onEditBtnClick}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
      </div>
    </Card>
  )
}
const About = ({ info, setModalOpen, setModalCategory }) => {
  const { about, skills:{tech, soft} } = info;

  const getAboutSectionText = about => {
    return about
  }

  const onEditBtnClick = () => {
    setModalCategory("about");
    setModalOpen(true)
  }
  return (
    <Card>
      <article className="content-container about-me">
        <h2>About me</h2>
        <div dangerouslySetInnerHTML={{__html: getAboutSectionText(about)}} />

        <h2>My skills</h2>
        <div className="tech-skills badges-container">
          <span>Tech skills: </span>
          {
            tech.map(skill => {
              return <Badge skill={skill} key={skill}/>
            })
          }
        </div>
        <div className="soft-skills badges-container">
          <span>Soft skills: </span>
          {
            soft.map(skill => {
              return <Badge skill={skill} key={skill}/>
            })
          }
        </div>
        <button className="edit-btn" onClick={onEditBtnClick}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
      </article>
    </Card>
  )
}
const Item = ({ label, value }) => {
  return(
    <div className="item">
      <label>{label}</label>
      <span className="value">{value}</span>
    </div>
  )
}
const Badge = ({skill }) => {
  return <span className="badge">{skill}</span>
}
export default Profile;