import axios from "axios";

const _axios = axios.create({
  baseURL: "http://www.omdbapi.com",
  params: {
    apikey: "29226366",
    i: "tt3896198",
  },
});

export default _axios;
