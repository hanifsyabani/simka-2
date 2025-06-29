import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL 
export async function GetAllKaryawan() {
  try {
    const response = await axios.get(`${API_URL}/karyawan`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}


export async function PostKaryawan(data: any) {
  try {
    const response = await axios.post(`${API_URL}/karyawan`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}