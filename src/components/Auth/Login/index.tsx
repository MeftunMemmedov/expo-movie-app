import { main_red, secondary_black } from "@/constants/colors";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Dimensions,
} from "react-native";
import Input from "../components/Input";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "@/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/api/helpers/auth";
import { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuthState } from "@/store/global/actions";
import { useAppDispatch } from "@/store/hooks";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MovieStackParams } from "@/types";

// "expires_at": 1773235846, "expires_in": 3600,

const { height } = Dimensions.get("screen");
const Login = ({
  setCurrentForm,
}: {
  setCurrentForm: Dispatch<SetStateAction<"login" | "register">>;
}) => {
  const nav = useNavigation<NavigationProp<any>>();
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
      nav.navigate("MovieStack");
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
            {isLoading || isSubmitting ? "Loading" : "Sign In"}
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
