import axios from "axios";

const axiosInstance = axios.create({
  // 1 localhost
  baseURL: "http://127.0.0.1:5001/clone-8628b/us-central1/api",

  // 2 deployed on firebase
  // baseURL: "https://api-etwpsgqazq-uc.a.run.app",

  // 3 deployed on render.com
//   baseURL: "https://amazon-api-deploybn.onrender.com/",
});
export { axiosInstance };


// https://api-etwpsgqazq-uc.a.run.app/