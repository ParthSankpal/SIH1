import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function UserRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    email: '',
    phone: '',
    password: '',
  });

  const [passwordError, setPasswordError] = useState('');
  //Password visibility check
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    // Password validation 
    if (formData.password.length < 5) {
      setPasswordError('Password must be at least 5 characters long');
      return;
    }

    try {
      console.log('Sending formData:', formData);
      const response = await axios.post('http://localhost:3000/api/user/register', formData);
      console.log('Response from server:', response.data);

    } catch (error) {
      console.error(error); // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <><Navbar /><div className='vw-100 vh-auto'>
      <main className='d-flex justify-content-center align-items-center py-5'>
      <form className='my-5 pt-4' onSubmit={handleSubmit}>
        <h1 className='d-flex justify-content-center mb-4 fs-2' style={{color:"#082f49"}}>Create your account</h1>

        <div className='mb-3'>
          <label for="name" class="form-label" style={{ color: '#64748B' }}>Name</label>
          <div className='input-group'>
            <input type="text" class="form-control" name="name" onChange={handleChange} required placeholder='Enter your name' />

          </div>
        </div>

        <div className='mb-3'>
          <label for="city" class="form-label" style={{ color: '#64748B' }}>City</label>
          <div className='input-group'>
            <input type="text" class="form-control" name="city" onChange={handleChange} required placeholder='Please select your city'/>
          </div>
        </div>
        <div className='mb-3'>
          <label for="email" class="form-label" style={{ color: '#64748B' }}>Email Address</label>
          <div className='input-group'>
            <input type="email" class="form-control" name="email" onChange={handleChange} required placeholder='Enter your email address'/>

          </div>
        </div>

        <div className='mb-3'>
          <label for="phone" class="form-label" style={{ color: '#64748B' }}>Phone Number</label>
          <div className='input-group'>
            <input type="number" class="form-control" name="phone" onChange={handleChange} required placeholder='Enter your phone number'/>
          </div>
        </div>
        <div className='mb-3'>
          <label for="password" class="form-label" style={{ color: '#64748B' }}>Password</label>
          <div className='input-group  '>
            <input type="password" class="form-control" name="password" onChange={handleChange} required placeholder='Enter password'/>

          </div>
        </div>

        <div className='mb-3'>
          <label htmlFor="confirmPassword" className="form-label" style={{ color: '#64748B' }}>Confirm Password</label>
          <div className='input-group position-relative'>
            <input type="password" className="form-control" name="confirmPassword" onChange={handleChange} required placeholder='Re-enter password'/>
          </div>
        </div>
        {passwordError && <p className="text-danger">{passwordError}</p>}


        <div class="input-group mb-3">
            <div class="align-middle">
              <input class="form-check-input mt-1 me-2" type="checkbox" value="" aria-label="Checkbox for following text input" required />
              <label for='terms&conditions' class="form-label" style={{ color: '#64748B' }}> I agree to terms & conditions</label>
            </div>
          </div>

          <div className='d-grid  '>
            <button className="btn btn-primary" style={{ backgroundColor: '#0891B2', color: 'white' }} type="submit">Sign Up</button>
          </div>
          <p class='d-flex justify-content-center my-2'>Already have an account? <a>Log in</a></p>
      </form>
      </main>
    </div></>
  );
}

export default UserRegistration;
