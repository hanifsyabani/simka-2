import axios from "axios";

export async function GetAllCabang() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/cabang`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function PostCabang(data: any) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/cabang`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
