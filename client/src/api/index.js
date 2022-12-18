import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

//the function we pass into API.interceptors.request.use() is run before any axios request
//add token to req.headers
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

const signIn = (userData) => {
  return API.post("/user/signin", userData);
};
const signUp = (userData) => API.post("/user/signup", userData);

const getSubs = (email) => {
  return API.get(`/subscriptions`, {
  params: {
   email
  }});
};

const updateSubs = (email, subscriptions) => {
  return API.patch("/subscriptions", { email, subscriptions });
};

export { signIn, signUp, getSubs, updateSubs };
