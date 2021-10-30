import axiosClient from "./axiosClient";

const userApi = {
  createUser: (data) => {
    const url = `/users/sign-up`;
    return axiosClient.post(url, data);
  },
  listUser: (params) => {
    const url = `/users/list-user`;
    return axiosClient.get(url, { params });
  },
};
export default userApi;
