import { View, Text } from "react-native";
import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
  const [currentForm, setCurrentForm] = useState<"login" | "register">("login");

  return (
    <View>
      {currentForm === "login" && <Login setCurrentForm={setCurrentForm}/>}
      {currentForm === "register" && <Register  setCurrentForm={setCurrentForm}/>}
    </View>
  );
};

export default Auth;
