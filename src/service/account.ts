import axios from "axios"


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GetListAccounts(){
  try {
    const response =await axios.get(`${API_URL}/accounts`, {
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