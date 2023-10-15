
import React from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import '../Styles/ProjectCard.css';
import {Link} from 'react-router-dom';

function InvestedProjectCard({ project }) {
  const navigate = useNavigate();
  
  const handleButtonClick = () => {
    console.log(project.id);
    navigate(`/investedprojectdetails/${project.id}`);
  };

  return (
    <div className='projectCard'>
      <img src={project.image} alt="Project Image" /> 
      <div className='projectName'>{project.name}</div>
      <div className='projectCategory'>{project.category}</div>
      <div className='projectGoal'>{project.goal}</div>
      <button className='button' onClick={() => handleButtonClick()}>
        View Projecet Details
      </button>
    </div>
  );
}

export default InvestedProjectCard;