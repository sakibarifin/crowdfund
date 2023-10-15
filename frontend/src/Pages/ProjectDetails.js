import React from 'react';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import projects from '../Components/DummyData';
import '../Styles/ProjectDetails.css'

function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  console.log(projectId);

  const project = projects.find((project) => project.id === projectId);
  const handleButtonClick = () => {
    navigate("/investform");
  };
  return (
    <div className='landing-page'>
      <Navbar />
      <div className='block'>
        <div className="ProjectDetails">
            <img src={project.image} alt="Project Image" />
            <h1>Name: {project.name}</h1>
            <p>{project.description}</p>
            <p>Category: {project.category}</p>
            <p>Goal: ${project.goal}</p>
            <div>
              <button className='button' onClick={() => handleButtonClick()}>
                Invest!
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
