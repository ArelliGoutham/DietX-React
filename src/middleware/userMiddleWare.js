import axios from 'axios';
import Cookies from 'js-cookie';

import { loginStart,loginSuccess,loginFailure,signupStart,signupSuccess,signupFailure,logout } from '../redux/slices/AuthSlice';

const USER_DETAILS_API = `${import.meta.env.VITE_API_URL}/api`;

export const login = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(`${USER_DETAILS_API}/user/login`, { email, password }, {withCredentials: true});
    const userDetails = response.data;

    sessionStorage.setItem('user', JSON.stringify(userDetails));

    dispatch(loginSuccess(userDetails));
  } catch (error) {
    dispatch(loginFailure('Login failed. Please try again.'));
  }
};

export const signup = (request) => async (dispatch) => {
  dispatch(signupStart());
  try {
    const response = await axios.post(`${USER_DETAILS_API}/user`, request);
    const user = response.data;
    dispatch(signupSuccess(user));
  } catch (error) {
    dispatch(signupFailure(error));
  }
}

export const signout = () => async (dispatch) => {
  Cookies.remove('token');
  dispatch(logout());
};