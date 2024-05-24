import axios from "axios";

// *************** REGISTER USER API ****************/
export const registerUserApi = async (data) => {
  try {
    const response = await axios.post("/users/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
  } catch (err) {
    throw err;
  }
};

// *************** LOGIN USER API ****************/
export const loginUserApi = async (data) => {
  try {
    const response = await axios.post("/users/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
  } catch (err) {
    throw err;
  }
};
