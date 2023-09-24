import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LawyerProfile = () => {

const userId = sessionStorage.getItem('userId');
  const userEmail = sessionStorage.getItem('userEmail');
  

  return (
    <div>
      <h2>Lawyer Profile</h2>
      <div>
        <h3>Name: {userId}</h3>
        {/* <p>City: {lawyerData.city}</p> */}
        <p>Email: {userEmail}</p>
        {/* <p>Phone: {lawyerData.phone}</p>
        <p>Level: {lawyerData.level}</p> */}
        <p>
          {/* Services: {lawyerData.services.map((service) => <span key={service}>{service}, </span>)} */}
        </p>
        Add more lawyer-specific information
      </div>
    </div>
  );
};

export default LawyerProfile;
