import axios from 'axios';

export default axios.create({
  baseURL: `http://201.185.239.191:8000/`,
  headers: {   crossDomain: true,"Access-Control-Allow-Origin": "*"},
  withCredentials: false
});