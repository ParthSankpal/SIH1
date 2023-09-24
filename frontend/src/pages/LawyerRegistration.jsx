import React, { useState } from 'react';
import axios from 'axios';
import Navabar from '../components/Navbar';
import Navbar from '../components/Navbar';



const LawyerRegistration = () => {

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    email: '',
    phone: '',
    password: '',
    level: '',
    services: '',
    degreeOrCertificateDocument: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setFormData({ ...formData, degreeOrCertificateDocument: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending data", formData); // Log the form data
      const response = await axios.post("http://localhost:3000/api/lawyer/register-lawyer", formData);
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error(error); // Handle error, e.g., show an error message to the user
    }
  };
  



  return (
      <><Navbar /><div className='vw-100 vh-auto'>
      <main className='d-flex justify-content-center align-middle pt-5'>
        <form className='mt-5 pt-4' onSubmit={handleSubmit} method="post" encType="multipart/form-data">
          <h1 className='d-flex justify-content-center mb-4 fs-2'>Create your account</h1>


          <div className='mb-3'>
            <label for="name" class="form-label" style={{ color: '#64748B' }}>Name</label>
            <div className='input-group'>
              <input type="text" class="form-control" name="name" onChange={handleChange} required />

            </div>
          </div>




          <div className='mb-3'>
            <label for="email" class="form-label" style={{ color: '#64748B' }}>Email Address</label>
            <div className='input-group'>
              <input type="email" class="form-control" name="email" onChange={handleChange} required />

            </div>
          </div>


          <div className='mb-3'>
            <label for="phone" class="form-label" style={{ color: '#64748B' }}>Phone Number</label>
            <div className='input-group'>
              <input type="number" class="form-control" name="phone" onChange={handleChange} required />
            </div>
          </div>
          <div className='mb-3'>
            <label for="password" class="form-label" style={{ color: '#64748B' }}>Password</label>
            <div className='input-group'>
              <input type="password" class="form-control" name="password" onChange={handleChange} required />

            </div>
          </div>

          <div className='mb-3'>
            <label for="city" class="form-label" style={{ color: '#64748B' }}>City</label>
            <div className='input-group'>
              <input type="text" class="form-control" name="city" onChange={handleChange} required />
            </div>
          </div>

          <div className='mb-3'>
            <label for="services" class="form-label" style={{ color: '#64748B' }}>Services (comma-separated)</label>
            <div className='input-group'>
              <input type="text" class="form-control" name="services" onChange={handleChange} required />

            </div>
          </div>
          <div className='mb-3'>
            <label for="certi" className="form-label" style={{ color: '#64748B' }}>Upload a Degree or Certificate</label>

            <div className='input-group'>
              <input type="file" className='form-control'  name="degreeOrCertificateDocument" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />

            </div>
          </div>
          <div className='mb-3'>
            <label for="level" class="form-label" style={{ color: '#64748B' }}>Experience Level</label>
            <div className='input-group'>

              <input type="text" class="form-control" name="level" onChange={handleChange} required />
            </div>
          </div>

          <div class="input-group mb-3">
            <div class="align-middle">
              <input class="form-check-input mt-1 me-2" type="checkbox" value="" aria-label="Checkbox for following text input" required />
              <label for='terms&conditions' class="form-label" style={{ color: '#64748B' }}> I agree to terms & conditions</label>
            </div>
          </div>

          <div className='d-grid  '>
            <button className="btn btn-primary" style={{ backgroundColor: '#0891B2', color: 'white' }} type="submit">Sign Up</button>
          </div>
          <p className='d-flex justify-content-center my-2'>Already have an account? 
            <a href="/lawyer/login" style={{color:'#0f69c9'}}>Log in</a>
          </p>
          
        </form>
      </main>
    </div></>
  )
}

export default LawyerRegistration