import axios from "axios";

const url = "http://localhost:5000/user";

// export const addSub = (id) => axios.patch(`/posts/${id}/likePost`);
// export const removeSub = (id) => axios.delete(`/posts/${id}`);

const signIn = (userData) => {
  console.log("inside sign in function");
  return axios.post(`${url}/signin`, userData);
};
const signUp = (userData) => axios.post(`${url}/signup`, userData);
const updateSubs = (id, subscriptions) => {
  return axios.patch(`${url}/subscriptions`, {id, subscriptions});
};

export { signIn, signUp, updateSubs };
