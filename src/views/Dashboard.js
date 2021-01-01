import React, { useState, useEffect } from "react";
// import { useAuthContext } from "../contexts/AuthContext";
import useFireStoreToGetDatum from "../firebase/hooks/useFirestoreToGetDatum";
import useFirestoreToGet from "../firebase/hooks/useFirestoreToGet";

import Card from "../components/Cards/Card";
import DashboardModal from "../components/Modals/DashboardModal";
import Error from "./Error";
import Preloader from "../components/Preloader/Preloader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  // const { currentUser } = useAuthContext();
  const projects = useFirestoreToGet("projects").docs;
  const messages = useFirestoreToGet("messages").docs;
  const { doc, error } = useFireStoreToGetDatum(
    "dashboard",
    "anybody@anywhere.com"
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState("");
  const [modalCategory, setModalCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (doc.name) {
      setUserDetails({
        ...doc,
        counts: { projects: projects.length, messages: messages.length },
      });
      setErrors(null);
    } else {
      setErrors(error);
    }

    setTimeout(() => setLoading(false), 1000);
  }, [doc, error, messages, projects]);

  // functions
  const openModal = () => {
    setModalOpen(true);
  };
  const openInfoModal = () => {
    openModal();
    setModalCategory("info");
  };
  const openAboutModal = () => {
    openModal();
    setModalCategory("about");
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalCategory(null);
  };
  const makeElementArray = (detailObject) => {
    const array = [];
    for (const key in detailObject) {
      array.push(<Item label={key} value={detailObject[key]} key={key} />);
    }
    return array;
  };
  const getAboutSectionText = (about) => {
    return about;
  };

  return (
    <main className="dashboard">
      {errors && !loading && !userDetails && <Error message={errors} />}

      {loading && !userDetails && !errors && (
        <Preloader size={100} border={10} color="#446df6d6" />
      )}
      {userDetails && (
        <>
          <section className="dashboard-cards">
            <Card>
              <div className="dashboard-card-column user-info">
                <div className="avatar">
                  <img src={userDetails.avatar_link} alt="" />
                </div>
                <div className="name">{userDetails.name}</div>
                <div className="job">{userDetails.job}</div>
                <div className="counts">
                  <div className="item-numbers">
                    {makeElementArray(userDetails.counts)}
                  </div>
                </div>
                {makeElementArray(userDetails.contact)}
                <a
                  href={userDetails.resume_link}
                  target="_blank"
                  rel="noreferrer"
                  className="resume"
                >
                  Résumé
                </a>

                <button className="edit-btn" onClick={openInfoModal}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
            </Card>
            <Card>
              <div className="dashboard-card-column about-me">
                <h2>About me</h2>
                <div></div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: getAboutSectionText(userDetails.about),
                  }}
                />

                <h2>My skills</h2>
                <div className="tech-skills badges-container">
                  <span>Tech skills: </span>
                  {userDetails.skills.tech.split(",").map((skill) => {
                    return <Badge skill={skill} key={skill} />;
                  })}
                </div>
                <div className="soft-skills badges-container">
                  <span>Soft skills: </span>

                  {userDetails.skills.soft.split(",").map((skill) => {
                    return <Badge skill={skill} key={skill} />;
                  })}
                </div>
                <button className="edit-btn" onClick={openAboutModal}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
            </Card>
          </section>
          <DashboardModal
            modalOpen={modalOpen}
            closeModal={closeModal}
            userDetails={userDetails}
            modalCategory={modalCategory}
          />
        </>
      )}
    </main>
  );
};

const Item = ({ label, value }) => {
  return (
    <div className="item">
      <label>{label}</label>
      <span className="value">{value}</span>
    </div>
  );
};

const Badge = ({ skill }) => {
  return <span className="badge">{skill}</span>;
};

export default Dashboard;
