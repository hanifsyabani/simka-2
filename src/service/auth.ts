import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export async function Login(data:any) {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data,{
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response.data
  } catch (error:any) {
    console.log(error.response.data.message)
    throw new Error(error.response.data.message)
  }
}


export async function Register(data: any) {
  try {
     await axios.post(`${API_URL}/auth/register`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    
  } catch (error:any) {
    throw new Error(error.response.data.message)
  }
}

export async function Logout() {
  try {
    const response = await axios.post(`${API_URL}/auth/logout`, {}, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response.data
  } catch (error:any) {
    throw new Error(error.response.data.message)
  }
}