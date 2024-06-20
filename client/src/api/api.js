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

// *************** FETCH PRODUCT CATEGORY ****************/
export const getProductCategory = async () => {
  try {
    const response = await axios.get("/product/get-product-category");

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
  } catch (err) {
    throw err;
  }
};

// *************** FETCH CATEGORY WISE PRODUCT  ****************/
export const getCategoryWiseProducts = async (category) => {
  try {
    const response = await axios.get("/product/get-category-wise-product", {
      params: { category },
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

// *************** GET PRODUCT DETAILS  ****************/
export const getProductDetails = async (id) => {
  try {
    const response = await axios.get(`/product/get-product-details/${id}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
  } catch (err) {
    throw err;
  }
};

// *************** PRODUCT ADD TO CART  ****************/
export const addToCart = async (productId) => {
  try {
    const response = await axios.post("/cart/add-to-cart", productId, {
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

// *************** COUNT CART ITEMS  ****************/
export const countCartItems = async () => {
  try {
    const response = await axios.get("/cart/count-cart-items", {
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

// *************** GET CART ITEMS  ****************/
export const getCartItems = async () => {
  try {
    const response = await axios.get("/cart/get-cart-items", {
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

// ************ UPDATE CART ITEMS (INCREASE, DECREASE)  **********/
export const updateCartItems = async (productId, action) => {
  try {
    const response = await axios.put(
      "/cart/update-cart-items",
      { productId, action },
      { withCredentials: true }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
  } catch (err) {
    throw err;
  }
};
// ************ REMOVE ITEM FROM CART **********/
export const removeFromCart = async (cartItemId) => {
  try {
    const response = await axios.post(
      "/cart/remove-from-cart",
      { cartItemId },
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
  } catch (err) {
    throw err;
  }
};

// **** SEARCH PRODUCT (NAME AND CATEGORY) *****/
export const searchProduct = async (query) => {
  try {
    const response = await axios.get(`/product/search-product?q=${query}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
  } catch (err) {
    throw err;
  }
};

// ************ FILTER PRODUCT ******************/
export const filterProduct = async (categories, priceSort, dateSort) => {
  try {
    const response = await axios.get("/product/filter-product", {
      params: {
        categories: categories.join(","),
        priceSort,
        dateSort,
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

// ************ CREATE ADDRESS ******************/
export const createAddress = async (data) => {
  try {
    const response = await axios.post("/address/create-address", data, {
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

// ************ GET ADDRESS ******************/
export const getAddresses = async () => {
  try {
    const response = await axios.get("/address/get-address", {
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

// ************ UPDATE ADDRESS ******************/
export const updateAddresses = async (id, data) => {
  try {
    const response = await axios.put(
      "/address/update-address",
      { id, ...data },
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
  } catch (err) {
    throw err;
  }
};
