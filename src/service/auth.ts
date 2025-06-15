import axios from "axios";

export async function Login(email: string, password: string) {
  try {
    const response = await axios.post(`http://localhost:8000/simka/auth/login`, {
      email,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data
  } catch (error:any) {
    throw new Error(error.message)
  }
}