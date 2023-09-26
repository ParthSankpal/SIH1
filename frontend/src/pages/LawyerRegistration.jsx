import React, { useState } from 'react';
import axios from 'axios';
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
    emailVerificationCode: '', // Field for email verification code
    phoneVerificationCode: '', // Field for phone verification code
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setFormData({ ...formData, degreeOrCertificateDocument: file });
  };

  const handleSendVerificationCode = async () => {
    try {
      // Send a request to your server to send verification codes
      const response = await axios.post('http://localhost:3000/api/lawyer/register-lawyer', {
        email: formData.email,
        phone: formData.phone,
      });
      if (response.status === 200) {
        // Display a success alert to the user
        alert('Email verification code sent successfully');
      } else {
        // Display an error alert to the user
        alert('Error sending email verification code');
      }
      console.log('Verification code sent:', response.data);
      // You can provide feedback to the user, e.g., "Verification code sent to your email and phone."
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerify = async () => {
    try {
      // Submit email and phone verification codes
      const { emailVerificationCode, phoneVerificationCode } = formData;
      const response = await axios.post('http://localhost:3000/api/lawyer/register-lawyer', {
        email: formData.email,
        phone: formData.phone,
        emailCode: emailVerificationCode,
        phoneCode: phoneVerificationCode,
      });
      console.log('Verification response:', response.data);
      
      // If verification is successful, proceed with registration
      if (response.data.verified) {
        // Continue with registration logic here
        const registrationResponse = await axios.post("http://localhost:3000/api/lawyer/register-lawyer", formData);
        console.log('Response from server:', registrationResponse.data);
        // Handle registration response as needed
      } else {
        // Handle verification failure
        console.error('Verification failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:3000/api/lawyer/register-lawyer', {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      city: formData.city,
      services: formData.services,
      level: formData.level,
      degreeOrCertificateDocument: formData.degreeOrCertificateDocument,
      emailVerificationCode: formData.emailVerificationCode,
      phoneVerificationCode: formData.phoneVerificationCode,
});

  };



  return (
      <><Navbar /><div className='vw-100 vh-auto'>
      <main className='d-flex justify-content-center align-middle pt-5'>
        <form className='mt-5 pt-4' onSubmit={handleSubmit} method="post" encType="multipart/form-data">
          <h1 className='d-flex justify-content-center mb-4 fs-2'>Create your account</h1>



            <div className='mb-3'>
              <label htmlFor='name' className='form-label' style={{ color: '#64748B' }}>
                Name
              </label>
              <div className='input-group'>
                <input type='text' className='form-control' name='name' onChange={handleChange}   />
              </div>
            </div>

            <div className='mb-3'>
              <label htmlFor='email' className='form-label' style={{ color: '#64748B' }}>
                Email Address
              </label>
              <div className='input-group'>
                <input type='email' className='form-control' name='email' onChange={handleChange}   />
              </div>
            </div>

            <div className='mb-3'>
              <label htmlFor='phone' className='form-label' style={{ color: '#64748B' }}>
                Phone Number
              </label>
              <div className='input-group'>
                <input type='number' className='form-control' name='phone' onChange={handleChange}   />
              </div>
            </div>

            <div className='d-grid mb-3'>
              <button
                className='btn btn-primary'
                style={{ backgroundColor: '#0891B2', color: 'white' }}
                type='button'
                onClick={handleSendVerificationCode}
              >
                Send Verification Code
              </button>
            </div>


            <div className='mb-3'>
              <label htmlFor='emailVerificationCode' className='form-label' style={{ color: '#64748B' }}>
                Email Verification Code
              </label>
              <div className='input-group'>
                <input
                  type='text'
                  className='form-control'
                  name='emailVerificationCode'
                  onChange={handleChange}
                   
                />
              </div>
            </div>

            <div className='mb-3'>
              <label htmlFor='phoneVerificationCode' className='form-label' style={{ color: '#64748B' }}>
                Phone Verification Code
              </label>
              <div className='input-group'>
                <input
                  type='text'
                  className='form-control'
                  name='phoneVerificationCode'
                  onChange={handleChange}
                   
                />
              </div>
            </div>

            <div className='d-grid'>
              <button
                className='btn btn-primary'
                style={{ backgroundColor: '#0891B2', color: 'white' }}
                type='button'
                onClick={handleVerify}
              >
                Verify 
              </button>
            </div>

            

          <div className='mb-3'>
            <label for="password" class="form-label" style={{ color: '#64748B' }}>Password</label>
            <div className='input-group'>
              <input type="password" class="form-control" name="password" onChange={handleChange}   />

            </div>
          </div>

          <div className='mb-3'>
            <label for="city" class="form-label" style={{ color: '#64748B' }}>City</label>
            <div className='input-group'>
              <input type="text" class="form-control" name="city" onChange={handleChange}   />
            </div>
          </div>

          <div className='mb-3'>
            <label htmlFor='services' className='form-label' style={{ color: '#64748B' }}>
            Services (comma-separated)
            </label>
            <div className='input-group'>
              <input type='text' className='form-control' name='services' onChange={handleChange}   />
            </div>
          </div>


          <div className='mb-3'>
            <label for="certi" className="form-label" style={{ color: '#64748B' }}>Upload a Degree or Certificate</label>

            <div className='input-group'>
              <input type="file" className='form-control'  name="degreeOrCertificateDocument" accept=".pdf,.doc,.docx" onChange={handleFileChange}   />

            </div>
          </div>
          <div className='mb-3'>
            <label for="level" class="form-label" style={{ color: '#64748B' }}>Experience Level</label>
            <div className='input-group'>

              <input type="text" class="form-control" name="level" onChange={handleChange}   />
            </div>
          </div>

          <div class="input-group mb-3">
            <div class="align-middle">
              <input class="form-check-input mt-1 me-2" type="checkbox" value="" aria-label="Checkbox for following text input"   />
              <label for='terms&conditions' class="form-label" style={{ color: '#64748B' }}> I agree to terms & conditions</label>
            </div>
          </div>

          

            <div className='d-grid'>
              <button
                className='btn btn-primary'
                style={{ backgroundColor: '#0891B2', color: 'white' }}
                type='button'
                onClick={handleSubmit}
              >
                Sign Up 
              </button>
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