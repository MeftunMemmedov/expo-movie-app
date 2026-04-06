import { main_red, secondary_black } from "@/constants/colors";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Input from "../components/Input";
import { Dispatch, SetStateAction, useState } from "react";
import { RegisterFormData, registerSchema } from "@/schemas/register.schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { signUp } from "@/api/helpers/auth";
import { createNewData } from "@/api/helpers";

const { height } = Dimensions.get("screen");
const Register = ({
  setCurrentForm,
}: {
  setCurrentForm: Dispatch<SetStateAction<"login" | "register">>;
}) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isLoading, isSubmitSuccessful },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", username: "", password: "" },
  });

  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data: RegisterFormData) => {
    const { email, password, username } = data;
    try {
      const res = await signUp(email, password, { username });
      // if (!res.user) {
      //   setError("root", { message: "User with this email already exists" });
      //   return;
      // }
      const userId = res.id;
      const uname = res.user_metadata.username;
      const e_mail = res.user_metadata.email;
      await createNewData("profiles", {
        id: userId,
        userName: uname,
        email: e_mail,
      });
      setSuccessMessage(
        "You have successfully signed up. Please check your email and verify by link.",
      );
      setTimeout(() => {
        setCurrentForm("login");
      }, 5000);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error?.response?.data.msg || "Register failed";
        setError("root", { message });
      }
    }
  };
  return (
    <View style={styles.screenContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Sign Up</Text>
        {successMessage && (
          <Text
            style={{
              color: "white",
              backgroundColor: secondary_black,
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderRadius: 5,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {successMessage}
          </Text>
        )}
        {errors.root && (
          <Text
            style={{
              color: "white",
              backgroundColor: "red",
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderRadius: 5,
              fontWeight: "bold",
            }}
          >
            {errors.root.message}
          </Text>
        )}
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value } }) => (
            <>
              <Input name="Username" value={value} onChange={onChange} />
              {errors.username && (
                <Text style={{ color: "red" }}>{errors.username.message}</Text>
              )}
            </>
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <>
              <Input name="Email" value={value} onChange={onChange} />
              {errors.email && (
                <Text style={{ color: "red" }}>{errors.email.message}</Text>
              )}
            </>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <>
              <Input name="Password" value={value} onChange={onChange} />
              {errors.password && (
                <Text style={{ color: "red" }}>{errors.password.message}</Text>
              )}
            </>
          )}
        />
        <Pressable
          style={styles.submitBtn}
          disabled={isLoading || isSubmitting}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.submitBtnText}>
            {isLoading || isSubmitting ? (
              <ActivityIndicator size={10} color={"white"} />
            ) : (
              "Sign Up"
            )}
          </Text>
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
    gap: 10,
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
    marginTop: 10,
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
