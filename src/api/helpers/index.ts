import axiosInstance from "..";

export const getDataList = async <T>(
  table_name: string,
  params?: Record<string, string | number | undefined>
) => {
  const { data } = await axiosInstance.get(`/${table_name}`, { params });

  return data as T[];
};

export const getData = async <T>(
  table_name: string,
  params: Record<string, string | number | undefined>
) => {
  const { data } = await axiosInstance.get(`/${table_name}`, { params });

  return data[0] as T;
};

export const createNewData = async <T>(table_name: string, data: T) => {
  await axiosInstance.post(`/${table_name}`, data, {
    headers: { "Content-Type": "application/json" },
  });
};

export const deleteData = async (
  table_name: string,
  params: Record<string, string | number | undefined>
) => {
  await axiosInstance
    .delete(`/${table_name}`, { params })
    .catch((err) => console.log(err.response.data));
};