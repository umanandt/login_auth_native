import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_KEY = "AIzaSyDFoTLQahVIeT9zETiRgPEcKEZasIZmABI";

// function to authenciate
async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  // to check weather code workes or not
  //console.log(response.data);
  const token = response.data.idToken;
  const refresh_token = response.data.refreshToken;
  await AsyncStorage.setItem("refresh_token", refresh_token);
  return token;
}
// this is for signup - or creating new user
/*export async function authenticate(email, password) {
  axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
}*/


// I can write this also fro signup
export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

// for login
export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
