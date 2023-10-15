import React , { useState }from 'react';
import Navbar from '../Components/Navbar';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import ProjectCard from '../Components/ProjectCard';
import projects from '../Components/DummyData';
import '../Styles/ProjectList.css';


function ProjectList() {

  let navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleButtonClick = (category) => {
    // Handle the button click for the given category
    console.log(`Clicked on ${category}`);
    navigate("/buyTokenPage");
  };
  const handleButtonClick2 = (category) => {
    // Handle the button click for the given category
    console.log(`Clicked on ${category}`);
    navigate("/myinvestments");
  };

  // Filter user profiles based on the search term
  const filteredUsers = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='landing-page'>
      <Navbar/>
        <div className='search-bar'>
          <input
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className='Buttondiv'>
            <button className='button' onClick={() => handleButtonClick()}>
            My Profile
            </button>
            <button className='button' onClick={() => handleButtonClick()}>
            Buy Points Now!
            </button>
            <button className='button' onClick={() => handleButtonClick2()}>
            My investments
            </button>
        </div>
        <div className='Project'>
            {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
            ))}
        </div>
    </div>
  );
}

export default ProjectList;
