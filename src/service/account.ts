import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GetListAccounts() {
  try {
    const response = await axios.get(`${API_URL}/accounts`, {
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

export async function GetAccount(userid: string) {
  try {
    const response = await axios.get(`${API_URL}/accounts/${userid}`, {
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

export async function EditAccount(userid: string, data: any) {
  try {
    const response = await axios.patch(
      `${API_URL}/accounts/update-account/${userid}`,
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
    throw new Error(error.response.data.message);
  }
}

export async function ChangeStatusAccount(userid: string, newstatus: boolean) {
  try {
    const response = await axios.patch(
      `${API_URL}/accounts/update-status-account/${userid}`,
      {
        status: newstatus,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function DeleteAccount(userid: string) {
  try {
    const response = await axios.delete(
      `${API_URL}/accounts/delete-account/${userid}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
