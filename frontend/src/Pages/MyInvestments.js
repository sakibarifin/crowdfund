import React , { useState }from 'react';
import Navbar from '../Components/Navbar';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import InvestedProjectCard from '../Components/InvestedProjectCard';
import projects from '../Components/DummyDataMyInvestments';
import '../Styles/ProjectList.css';


function ProjectList() {

  let navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleButtonClick = (category) => {
    // Handle the button click for the given category
    console.log(`Clicked on ${category}`);
    navigate("/buyTokenPage");
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
        <div className='Project'>
            {projects.map((project, index) => (
            <InvestedProjectCard key={index} project={project} />
            ))}
        </div>
    </div>
  );
}

export default ProjectList;
