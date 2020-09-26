/* eslint-disable */
import '@babel/polyfill';
import { login, logout, signup, resetPassword, updatePassword } from './auth/login';

// DOM ELEMENTS
const signupForm = document.querySelector('.form--signup');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav-link--logout');
const resetPasswordForm = document.querySelector('.form--reset-paswword');
const updatePasswordForm = document.querySelector('.form--update-password');

if (signupForm) {
   signupForm.addEventListener('submit', e => {
      e.preventDefault();
     const name = document.getElementById('name').value;
     const email = document.getElementById('email').value;
     const password = document.getElementById('password').value;
     const passwordConfirm = document.getElementById('passwordConfirm').value;
     signup(name, email, password, passwordConfirm);
   });
}

if (loginForm) {
   loginForm.addEventListener('submit', e => {
      e.preventDefault();
     const email = document.getElementById('email').value;
     const password = document.getElementById('password').value;
     login(email, password);
   });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (resetPasswordForm) {
   resetPasswordForm.addEventListener('submit', e => {
      e.preventDefault();
     const email = document.getElementById('email').value;
     const password = document.getElementById('password').value;
     const passwordConfirm = document.getElementById('passwordConfirm').value;
     resetPassword(email, password, passwordConfirm);
   });
 }

if (updatePasswordForm) {
   updatePasswordForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const passwordConfirm = document.getElementById('passwordConfirm').value;
      updatePassword(email, password, passwordConfirm, updatePasswordForm);
   });
 }