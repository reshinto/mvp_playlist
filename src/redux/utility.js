export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Get token from localStorage instead from state
  const token = localStorage.getItem("authToken");
  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `${token}`;
  }
  return config;
};

// export const db = "http://localhost:8080";
export const db = "https://mvp-playlist-server.herokuapp.com";
