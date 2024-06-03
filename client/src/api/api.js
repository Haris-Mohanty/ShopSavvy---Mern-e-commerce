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
      withCredentials: true,
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

// *************** GET USER DETAILS ****************/
export const getUserDetails = async () => {
  try {
    const response = await axios.get("/users/user-details", {
      withCredentials: true,
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

// *************** USER LOGOUT ****************/
export const logoutUser = async () => {
  try {
    const response = await axios.get("/users/logout", {
      withCredentials: true,
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

// *************** GET ALL USERS ****************/
export const getAllUsers = async (page) => {
  try {
    const response = await axios.get(`/admin/get-all-users?page=${page}`, {
      withCredentials: true,
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

// *************** UPDATE USER ****************/
export const updateUser = async (id, data) => {
  try {
    const response = await axios.put(`/admin/update-user/${id}`, data, {
      withCredentials: true,
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

// *************** DELETE USER ****************/
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`/admin/delete-user/${id}`, {
      withCredentials: true,
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

// *************** UPLOAD PRODUCT ****************/
export const uploadProduct = async (data) => {
  try {
    const response = await axios.post("/product/upload-product", data, {
      withCredentials: true,
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

// *************** GET ALL PRODUCTS ****************/
export const getAllProducts = async () => {
  try {
    const response = await axios.get("/product/get-all-products");

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
  } catch (err) {
    throw err;
  }
};

// *************** UPDATE PRODUCT DETAILS ****************/
export const updateProductDetails = async (id, data) => {
  try {
    const response = await axios.put(`/product/update-product/${id}`, data, {
      withCredentials: true,
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
