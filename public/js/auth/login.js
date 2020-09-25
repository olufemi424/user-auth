/* eslint-disable */
import axios from 'axios';

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm
      }
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    console.log('error', err)
  }
};

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password
      }
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    console.log('error', err)
  }
};

export const logout = async () => {
  console.log('here')
   try {
     const res = await axios({
       method: 'GET',
       url: '/api/v1/users/logout'
     });

     //reload the same page
     if (res.data.status === 'success') location.reload();
   } catch (err) {
     console.log('Error logging out', Err)
   }
 };

 export const resetPassword = async (email, newPassword, passwordConfirm) => {
   try {
     const res = await axios({
       method: 'POST',
       url: '/api/v1/users/resetPassword',
       data: {
        email,
        newPassword,
        passwordConfirm
      }
     });
     
     //reload the same page
     if (res.data.status === 'success') location.reload();
   } catch (err) {
     console.log('Error logging out', Err)
   }
 };