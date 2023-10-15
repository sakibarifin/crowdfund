//CreateProjectPage

import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import '../Styles/CreateProjectPage.css';
import { useNavigate } from 'react-router-dom';

function CreateProjectPage() {
  const [projectData, setProjectData] = useState({
    projectTitle: '',
    description:'',
    goal: 0,
    category: '',
    subCategory: '',
    deadline: '',
    imageLink: '',
    firstMilestoneDate: '',
    secondMilestoneDate: '',
    thirdMilestoneDate: '',
  });
  const [popupVisible, setPopupVisible] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPopupVisible(true);
    //navigate('/')
  };
  const closePopup = () => {
    // Close the popup when the "Close" button is clicked
    setPopupVisible(false);
  }

  return (
    <div className='landing-page'>
      <Navbar />
      
      <div className='centerForm'>
      <div className='createProjectPage'>
        <h2>Create a New Project</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='projectTitle'>Project Title:</label>
            <input 
              type='text'
              id='projectTitle'
              name='projectTitle'
              value={projectData.projectTitle}
              onChange={handleInputChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='goal'>Goal:</label>
            <input
              type='number'
              id='goal'
              name='goal'
              value={projectData.goal}
              onChange={handleInputChange}
            />
          </div>
          
          <div className='form-group'>
            <label htmlFor='description'>Description:</label>
            <input
              type='text'
              id='description'
              name='description'
              value={projectData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='category'>Category:</label>
            <input
              type='text'
              id='category'
              name='category'
              value={projectData.category}
              onChange={handleInputChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='subCategory'>Sub Category:</label>
            <input
              type='text'
              id='subCategory'
              name='subCategory'
              value={projectData.subCategory}
              onChange={handleInputChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='deadline'>Deadline:</label>
            <input
              type='date'
              id='deadline'
              name='deadline'
              value={projectData.deadline}
              onChange={handleInputChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='imageLink'>Image Link:</label>
            <input
              type='text'
              id='imageLink'
              name='imageLink'
              value={projectData.imageLink}
              onChange={handleInputChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='firstMilestoneDate'>1st Milestone Date:</label>
            <input
              type='date'
              id='firstMilestoneDate'
              name='firstMilestoneDate'
              value={projectData.firstMilestoneDate}
              onChange={handleInputChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='secondMilestoneDate'>2nd Milestone Date:</label>
            <input
              type='date'
              id='secondMilestoneDate'
              name='secondMilestoneDate'
              value={projectData.secondMilestoneDate}
              onChange={handleInputChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='thirdMilestoneDate'>3rd Milestone Date:</label>
            <input
              type='date'
              id='thirdMilestoneDate'
              name='thirdMilestoneDate'
              value={projectData.thirdMilestoneDate}
              onChange={handleInputChange}
            />
          </div>
          <button type='submit'>Create Project</button>
          {popupVisible && (
            <div className="popup">
              <div className="popup-content">
                <p>Project created successfully.</p> {/* Customize the message as needed */}
                <button onClick={closePopup}>Close</button>
              </div>
            </div>
          )}
        </form>
      </div>
      </div>
      
    </div>
  );
}

export default CreateProjectPage;
