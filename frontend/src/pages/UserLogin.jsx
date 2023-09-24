import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function UserLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/user/login', formData);
      console.log(response.data); // Handle success, e.g., store user data in the application state
    } catch (error) {
      console.error(error); // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <><Navbar /><div className='vw-100 vh-100'>
      <main className='d-flex justify-content-center align-items-center pt-5'>
        <form className='mt-5 pt-4' onSubmit={handleSubmit}>
          <h2 className='d-flex justify-content-center mb-4 fs-2'>Login as Service Provider</h2>

          <div className='mb-3'>
            <label for="email" class="form-label" style={{ color: '#64748B' }}>Email Address</label>
            <div className='input-group'>
              <input type="email" class="form-control" name="email" onChange={handleChange} required />

            </div>
          </div>
          <div className='mb-1'>
            <label for="password" class="form-label" style={{ color: '#64748B' }}>Password</label>
            <div className='input-group'>
              <input type="password" class="form-control" name="password" onChange={handleChange} required />

            </div>
          </div>

          <label for='terms&conditions' class=" d-flex justify-content-center mb-4"> Forgot password? </label>

          <div className='d-grid  '>
            <button className="btn btn-primary" style={{ backgroundColor: '#0891B2', color: 'white' }} type="submit">Log in</button>
          </div>

          <div class='d-flex justify-content-center '><button  style={{backgroundColor: '#ffffff',color:'#0f69c9'}}>Forgot password? </button></div>


          <div className="d-flex justify-content-center align-items-center " style={{ color: '#9ca4ae' }}>
            <hr className="flex-grow-1 my-2" />
            <span className="m-2" >or</span>
            <hr className="flex-grow-1 my-2" />
            
          </div>

          <div className='d-grid  '>
            <button className="btn btn-primary fw-bolder  border border-0 shadow-sm  d-flex position-relative" style={{ backgroundColor: '#ffffff', color: '#082F49' }} type="submit">
            <svg  className='position-absolute ' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 30 32" fill="none">
              <path d="M27.2569 12.9847H26.25V12.931H15V18.1035H22.0644C21.0338 21.1144 18.2644 23.2759 15 23.2759C10.8581 23.2759 7.5 19.8019 7.5 15.5172C7.5 11.2325 10.8581 7.75863 15 7.75863C16.9119 7.75863 18.6513 8.50475 19.9756 9.7235L23.5112 6.06595C21.2787 3.91358 18.2925 2.58621 15 2.58621C8.09688 2.58621 2.5 8.37608 2.5 15.5172C2.5 22.6584 8.09688 28.4483 15 28.4483C21.9031 28.4483 27.5 22.6584 27.5 15.5172C27.5 14.6502 27.4137 13.8039 27.2569 12.9847Z" fill="#FFC107"/>
              <path d="M3.94128 9.4985L8.04816 12.6142C9.15941 9.76811 11.8507 7.75863 15 7.75863C16.9119 7.75863 18.6513 8.50475 19.9757 9.7235L23.5113 6.06595C21.2788 3.91358 18.2925 2.58621 15 2.58621C10.1988 2.58621 6.03503 5.39031 3.94128 9.4985Z" fill="#FF3D00"/>
              <path d="M15 28.4483C18.2287 28.4483 21.1625 27.1701 23.3806 25.0914L19.5118 21.7048C18.2147 22.7253 16.6296 23.2772 15 23.2759C11.7487 23.2759 8.98808 21.1313 7.94808 18.1384L3.87183 21.3873C5.94058 25.575 10.1418 28.4483 15 28.4483Z" fill="#4CAF50"/>
              <path d="M27.2569 12.9847H26.25V12.931H15V18.1034H22.0644C21.5714 19.5365 20.6833 20.7887 19.51 21.7054L19.5119 21.7041L23.3806 25.0907C23.1069 25.3481 27.5 21.9828 27.5 15.5172C27.5 14.6502 27.4137 13.8039 27.2569 12.9847Z" fill="#1976D2"/>
            </svg>
              <div class=' w-100'>
                <p className='m-0'>Log in with Google</p>
              </div>
            </button>
          </div>


          <p class='d-flex justify-content-center my-2'>Don’t have an account? <a href='/user/register'>Sign up</a></p>

          
        </form>
      </main>
    </div></>
  );
}

export default UserLogin;
