import axiosAuthInstance from "../auth";

export const signUp = async (
  email: string,
  password: string,
  metadata?: Record<string, string | boolean>,
) => {
  const { data } = await axiosAuthInstance.post("signup", {
    email,
    password,
    data: metadata,
  });

  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data } = await axiosAuthInstance.post("token?grant_type=password", {
    email,
    password,
  });
  return data;
};

export const refreshToken = async (refresh_token: string) => {
  const { data } = await axiosAuthInstance.post(
    "token?grant_type=refresh_token",
    { refresh_token }
  );

  return data;
};

export const getUser = async (access_token: string) => {
  const { data } = await axiosAuthInstance.get("user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
};
