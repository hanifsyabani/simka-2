import axios from "axios";

export async function Login(data:any) {
  try {
    const response = await axios.post(`http://localhost:8000/simka/auth/login`, data,{
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
     await axios.post(`http://localhost:8000/simka/auth/register`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    
  } catch (error:any) {
    throw new Error(error.response.data.message)
  }
}