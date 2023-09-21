import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { auth } from "../store/auth-context";
import axios from "axios";

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState("");
  const authCtx = useContext(auth);
  const token = authCtx.token;

  useEffect(() => {
    axios
      .get(
        "https://all-react-native-default-rtdb.firebaseio.com/message.json?auth=" +
          token
      )
      .then((response) => {
        setFetchedMessage(response.data);
      });
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

// important
// to get data from any database in firbase is easy
// but if you want to give access to authrize users then
// need to match the token so that real users can see the data
// if a request is coming from a authenticated users or not

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
