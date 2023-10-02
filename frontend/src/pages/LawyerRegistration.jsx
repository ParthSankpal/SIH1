import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
// import { useHistory } from 'react-router-dom';

const LawyerRegistration = () => {
  // const history = useHistory();

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    email: '',
    phone: '',
    password: '',
    level: '',
    services: '',
    degreeOrCertificateDocument: null,
    emailVerificationCode: '',
    phoneVerificationCode: '',
  });

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isfinalVerified, setFinalVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, degreeOrCertificateDocument: file });
  };

  const handleSendVerificationCode = async () => {
    try {
      const { email, phone } = formData;
      const response = await axios.post('http://localhost:3000/api/lawyer/send-verification-code', {
        email,
        phone,
      });

      if (response.status === 200) {
        alert('Email verification code sent successfully');
        setIsCodeSent(true);
      } else {
        alert('Error sending email verification code');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerify = async () => {
    try {
      const { emailVerificationCode, phoneVerificationCode, email, phone } = formData;
      const response = await axios.post('http://localhost:3000/api/lawyer/verify', {
        email,
        phone,
        emailCode: emailVerificationCode,
        phoneCode: phoneVerificationCode,
      });

      if (response.data.verified) {
        setIsVerified(true);
        alert('Verification successful');
        setFinalVerified(true);
      } else {
        console.error('Verification failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isfinalVerified) {
        const response = await axios.post('http://localhost:3000/api/lawyer/register-lawyer', formData);
        console.log('Response from server:', response.data);
        // history.push('/login');
      } else {
        alert('Please verify your email and phone first');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to check if both verification codes are entered
  const canVerify = () => {
    const { emailVerificationCode, phoneVerificationCode } = formData;
    return emailVerificationCode !== '' && phoneVerificationCode !== '';
  };

  return (
    <>
      <Navbar />
      <div className='vw-100 vh-auto'>
        <main className='d-flex justify-content-center align-middle pt-5'>
          <form className='mt-5 pt-4' onSubmit={handleSubmit} method="post" encType="multipart/form-data">
            <h1 className='d-flex justify-content-center mb-4 fs-2'>Create your account</h1>

            <div className='mb-3'>
              <label htmlFor='name' className='form-label' style={{ color: '#64748B' }}>
                Name
              </label>
              <div className='input-group'>
                <input type='text' className='form-control' name='name' onChange={handleChange} />
              </div>
            </div>

            <div className='mb-3'>
              <label htmlFor='email' className='form-label' style={{ color: '#64748B' }}>
                Email Address
              </label>
              <div className='input-group'>
                <input type='email' className='form-control' name='email' onChange={handleChange} />
              </div>
            </div>

            <div className='mb-3'>
              <label htmlFor='phone' className='form-label' style={{ color: '#64748B' }}>
                Phone Number
              </label>
              <div className='input-group'>
                <input type='number' className='form-control' name='phone' onChange={handleChange} />
              </div>
            </div>

            <div className='d-grid mb-3'>
              <button
                className='btn btn-primary'
                style={{ backgroundColor: '#0891B2', color: 'white' }}
                type='button'
                onClick={handleSendVerificationCode}
              >
                {isCodeSent?"Resend" : 'Send Verification Code'}
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

            <div className='d-grid mb-3'>
              <button
                className='btn btn-primary'
                style={{ backgroundColor: '#0891B2', color: 'white' }}
                type='button'
                onClick={handleVerify}
                disabled={!canVerify()} // Disable the Verify button until both codes are entered
              >
                {isVerified ? 'Verified' : 'Verify'}
              </button>
            </div>

            <div className='mb-3'>
                <label for="password" className="form-label" style={{ color: '#64748B' }}>Password</label>
                <div className='input-group'>
                  <input type="password" className="form-control" name="password" onChange={handleChange} />
                </div>
              </div>
            <div className='mb-3'>
              <label for="city" className="form-label" style={{ color: '#64748B' }}>City</label>
              <div className='input-group'>
                <input type="text" className="form-control" name="city" onChange={handleChange} />
              </div>
            </div>

            <div className='mb-3'>
              <label htmlFor='services' className='form-label' style={{ color: '#64748B' }}>
                Services (comma-separated)
              </label>
              <div className='input-group'>
                <input type='text' className='form-control' name='services' onChange={handleChange} />
              </div>
            </div>

            <div className='mb-3'>
              <label for="certi" className="form-label" style={{ color: '#64748B' }}>Upload a Degree or Certificate</label>
              <div className='input-group'>
                <input type="file" className='form-control' name="degreeOrCertificateDocument" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
              </div>
            </div>

            <div className='mb-3'>
              <label for="level" className="form-label" style={{ color: '#64748B' }}>Experience Level</label>
              <div className='input-group'>
                <input type="text" className="form-control" name="level" onChange={handleChange} />
              </div>
            </div>

            <div className="input-group mb-3">
              <div className="align-middle">
                <input className="form-check-input mt-1 me-2" type="checkbox" value="" aria-label="Checkbox for following text input" />
                <label for='terms&conditions' className="form-label" style={{ color: '#64748B' }}> I agree to terms & conditions</label>
              </div>
            </div>

            <div className='d-grid'>
              <button
                className='btn btn-primary'
                style={{ backgroundColor: '#0891B2', color: 'white' }}
                type='button'
                onClick={handleSubmit}
                // disabled={!isfinalVerified} // Disable the Sign Up button until verification is successful
              >
                Sign Up
              </button>
            </div>

            <p className='d-flex justify-content-center my-2'>Already have an account?
              <a href="/lawyer/login" style={{ color: '#0f69c9' }}>Log in</a>
            </p>

          </form>
        </main>
      </div>
    </>
  )
}

export default LawyerRegistration;
