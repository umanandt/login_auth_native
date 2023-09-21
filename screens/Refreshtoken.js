import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_KEY = "AIzaSyDFoTLQahVIeT9zETiRgPEcKEZasIZmABI";



async function refreshToken() {
  const refresh_token = await AsyncStorage.getItem("refresh_token");

  const url = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;
  const requestBody = {
    grant_type: "refresh_token",
    refresh_token: refresh_token,
  };


  try {
    const response = await axios.post(url, requestBody);
    const newToken = response.data.access_token;
    return newToken;
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
    throw error;
  }
}

export function newTokenInHour() {
  return refreshToken();
}
