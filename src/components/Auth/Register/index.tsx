import { main_red, secondary_black } from "@/constants/colors";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import Input from "../components/Input";
import { Dispatch, SetStateAction } from "react";

const { height } = Dimensions.get("screen");
const Register = ({
  setCurrentForm,
}: {
  setCurrentForm: Dispatch<SetStateAction<"login" | "register">>;
}) => {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Sign Up</Text>
        <Input name="Username" onChange={() => {}} />
        <Input name="Email" onChange={() => {}} />
        <Input name="Password" onChange={() => {}} />
        <Pressable style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Sign Up</Text>
        </Pressable>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Have an account? Then </Text>
          <Pressable
            style={styles.textBtn}
            onPress={() => setCurrentForm("login")}
          >
            <Text style={styles.textBtnText}>Sign In</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  screenContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height,
  },
  formContainer: {
    flexDirection: "column",
    // borderWidth: 1,
    // borderColor: "red",
    width: 300,
  },
  formTitle: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  submitBtn: {
    backgroundColor: main_red,
    width: 100,
    height: 40,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtnText: { color: "white", fontWeight: "bold" },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 5,
  },
  text: { color: "white" },
  textBtn: {},
  textBtnText: { color: main_red },
});
