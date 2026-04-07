import { signIn } from "@/api/helpers/auth";
import { main_red } from "@/constants/colors";
import { LoginFormData, loginSchema } from "@/schemas/login.schema";
import { getAuthState } from "@/store/global/actions";
import { useAppDispatch } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import { router } from "expo-router";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import Input from "../components/Input";

const { height } = Dimensions.get("screen");
const Login = ({
  setCurrentForm,
}: {
  setCurrentForm: Dispatch<SetStateAction<"login" | "register">>;
}) => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    const { email, password } = data;
    try {
      const tokens = await signIn(email, password);
      await AsyncStorage.setItem(
        "auth",
        JSON.stringify({
          access: tokens?.access_token,
          refresh: tokens?.refresh_token,
          expires_at: tokens?.expires_at,
        }),
      );
      dispatch(getAuthState(tokens?.access_token));
      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error?.response?.data.msg || "Login failed";
        setError("root", { message });
      }
    }
  };
  return (
    <View style={styles.screenContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Sign In</Text>
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
              "Sign In"
            )}
          </Text>
        </Pressable>
        <View style={styles.textContainer}>
          <Text style={styles.text}>No account? Then </Text>
          <Pressable
            style={styles.textBtn}
            onPress={() => setCurrentForm("register")}
          >
            <Text style={styles.textBtnText}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Login;

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
