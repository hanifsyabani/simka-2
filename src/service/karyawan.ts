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

export async function GetKaryawanById(id: string) {
  try {
    const response = await axios.get(`${API_URL}/karyawan/${id}`, {
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

export async function EditKaryawan(id: string, data: any) {
  try {
    const response = await axios.put(`${API_URL}/karyawan/${id}`, data, {
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