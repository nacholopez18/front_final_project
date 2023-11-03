import api from "./rule_API";

export const allActivity = async (token) => {
  let url = "/activity";
  try {
    const result = await api.get(url, {
      headers: { Authorization: token },
    });
    console.log(result);
    return result.data;
  } catch (error) {
    throw error.response.data.error;
  }
};
export const allMood = async (token) => {
  let url = "/mood";
  try {
    const result = await api.get(url, {
      headers: { Authorization: token },
    });
    console.log(result);
    return result.data;
  } catch (error) {
    throw error.response.data.error;
  }
};
export const allWeather = async (token) => {
  let url = "/weather";
  try {
    const result = await api.get(url, {
      headers: { Authorization: token },
    });
    console.log(result);
    return result.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const allGender = async (token) => {
  let url = "/gender";
  try {
    const result = await api.get(url, {
      headers: { Authorization: token },
    });
    console.log(result);
    return result.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const contextualMusic = async (dataToSend, token) => {
  let url = "/contextualPlaylist";
  try {
    const response = await api.post(url, dataToSend, {headers:{Authorization: token}});
    return response.data;
  } catch (error) {
    throw (
      error.response.data.error 
    );
  }
};