import { useContext, useState, useEffect } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { login } from "../util/auth";
import { auth } from "../store/auth-context";
import { newTokenInHour } from "./Refreshtoken";

function LoginScreen() {
  const [isAUhtenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(auth);
  useEffect(() => {
    if (authCtx.isAuthenticated) {
      startTokenRefreshTimer();
      startLogoutTimer();
    }
  }, []);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
      startTokenRefreshTimer();
      startLogoutTimer();
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again later "
      );
      setIsAuthenticating(false);
    }
  }

  if (isAUhtenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  // refeshing token after an hour
  const startTokenRefreshTimer = async () => {
    const tokenRefreshInterval = setInterval(async () => {
      const refreshedToken = await newTokenInHour();
      if (refreshedToken) {
        authCtx.authenticate(refreshedToken);
      }
    }, 3600000);
    return () => clearInterval(tokenRefreshInterval);
  };

  const startLogoutTimer = (async = () => {
    const logoutTimer = setInterval(async () => {
      authCtx.logout();
    }, 3600000);
    return () => clearInterval(logoutTimer);
  });

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;

// I can make anothe function using timer of an hour
// where authCtx.logout() gets calles after an hour
//  using useeffect authctx.isauthenticated
// it means timer of logout can be started
// and actual setInterval function like above
// will call logout, 3600000 then return anc clearInterval
