const configuration = {
  ApiUrl: "http://ec2-18-118-107-150.us-east-2.compute.amazonaws.com:5000",
  ///ApiUrl: "http://localhost:5000",
  setApiRequestToken: (token) => {
    localStorage.setItem("requestToken", JSON.stringify(token));
  },
  removeApiRequestToken: (token) => {
    localStorage.removeItem("requestToken");
  },
  getAPIRequestToken: () => {
    return JSON.parse(localStorage.getItem("requestToken"));
  },
};

export const clientURL = "http://fe-siken-ute.ml/";

export default configuration;
