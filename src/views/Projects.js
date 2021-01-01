import React, { useEffect, useState } from "react";
import useFirestoreToGet from "../firebase/hooks/useFirestoreToGet";

import ProjectCard from "../components/Cards/ProjectCard";
import ProjectModal from "../components/Modals/ProjectModals";
import Preloader from "../components/Preloader/Preloader";
import Error from "./Error";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faProjectDiagram } from "@fortawesome/free-solid-svg-icons";

const Projects = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState("delete");
  const [projects, setProjects] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionProject, setActionProject] = useState("");

  const { docs, error } = useFirestoreToGet("projects");

  useEffect(() => {
    if (docs) {
      setProjects(docs);
      setErrors(error);
      setTimeout(() => setLoading(false), 1000);
    }
  }, [docs, error]);

  const openEditModal = (project) => {
    setModalAction("edit");
    setModalOpen(true);
    setActionProject(project);
  };

  const openAddModal = () => {
    setModalOpen(true);
    setModalAction("add");
  };

  const openDeleteModal = (project) => {
    setModalOpen(true);
    setModalAction("delete");
    setActionProject(project);
  };

  return (
    <main className="projects">
      <div className="project-list">
        {projects.map((project) => {
          return (
            <ProjectCard
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
              key={project.id}
              project={project}
            />
          );
        })}
        {errors && !loading && !projects[0] && <Error message={errors} />}
        {!errors && !loading && !projects[0] && (
          <Error
            message={`You have no projects...`}
            mood=""
            title={<FontAwesomeIcon icon={faProjectDiagram} />}
          />
        )}
        {loading && <Preloader size={100} border={10} color="#446df6d6" />}
      </div>
      {!errors && (
        <button className="add-project-btn" onClick={openAddModal}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      )}

      <ProjectModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalAction={modalAction}
        actionProject={actionProject}
      />
    </main>
  );
};

export default Projects;
