import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { auth } from "../store/auth-context";


function SignupScreen() {
  const [isAUhtenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(auth);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      // here I need token to pass
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not create user . Please check your input and try again later"
      );
    }
    setIsAuthenticating(false);
  }

  if (isAUhtenticating) {
    return <LoadingOverlay message="creating user..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}
// this is tricky because the forst step is <AuthContent onAuthenticate={signupHandler}
// after that signupHandler gets email and passward
// after that create user called and auhtencuate and create user in froebase
// using axios
export default SignupScreen;
