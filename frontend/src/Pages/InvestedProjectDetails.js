import React from 'react';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import projects from  '../Components/DummyDataMyInvestments';
import '../Styles/ProjectDetails.css'


function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  console.log('-----------------------------');
  console.log(projectId);

  const project = projects.find((project) => project.id === projectId);
  console.log(project);
  const handleButtonClick = () => {
    navigate("/milestoneprogress");
  };
  const incrementApprove = () => {
    console.log('aprove increment');
  };
  const incrementAbort = () => {
    console.log('abort incremented');
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
        <h3>1st Milestone</h3>
        <p>Our progress:</p>
        <img src={project.milestone1image} alt="Project Image" />
        <div className='center'>
            <button className='button' onClick={() => incrementApprove()}>
            Approve the Milestone 
            </button>
            <button className='button' onClick={() => incrementAbort()}>
            Not Satisfied 
            </button>
        </div>
      </div>

    </div>
    </div>
  );
}

export default ProjectDetails;
