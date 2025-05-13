import React from 'react';
import './AboutUs.css';
import Navbar from '../../components/Navbar';

const teamMembers = [
  {
    name: 'Ritik Dongre',
    
    description: 'CDAC Mumbai',
    image: './ritik.jpg', 
  },
  {
    name: 'Sejal Sonwal',
    description: "CDAC Mumbai",
    image: './sejal.jpg',
  },
  {
    name: 'Shriraj Dhuri',
    description: 'CDAC Mumbai',
    image: './shriraj.jpg',
  }
];

const AboutUs = () => {
  return (
    <>
    <Navbar/>
    <div className="team-container">
      <h2 className="team-title">The Team</h2>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <img src={member.image} alt={member.name} className="team-image" />
            <h3>{member.name}</h3>
            <p>{member.description}</p>
          </div>
        ))}
      </div>
    </div>
      </>
  );
};

export default AboutUs;
