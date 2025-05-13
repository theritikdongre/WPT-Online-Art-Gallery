import React from 'react';
import './AboutUs.css';
import Navbar from '../../components/Navbar';

const teamMembers = [
  {
    name: 'Ritik Dongre',
    role: 'Co-founder',
    description: 'Kimay is our co-founder and has developed search strategies for a variety of clients from international brands to medium sized businesses for over five years.',
    image: './ritik.jpg', 
  },
  {
    name: 'Sejal Sonwal',
    role: 'Writer',
    description: "Graduating with a degree in Spanish and English, Vrushali has always loved writing and now she's lucky enough to do it as part of her new job inside our agency.",
    image: './art-2.jpeg',
  },
  {
    name: 'Shriraj Dhuri',
    role: 'Digital Marketer',
    description: 'Rushikesh first fell in love with digital marketing at the university. He loves to learn, and looks forward to being part of this new exciting industry for many years.',
    image: './art-3.webp',
  }
];

const AboutUs = () => {
  return (
    <>
    <Navbar/>
    <div className="team-container">
      <h2 className="team-title">The Team</h2>
      <p className="team-description">
        There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some injected humour.
      </p>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <img src={member.image} alt={member.name} className="team-image" />
            <h3>{member.name}</h3>
            <p className="team-role">{member.role}</p>
            <p>{member.description}</p>
          </div>
        ))}
      </div>
    </div>
      </>
  );
};

export default AboutUs;
