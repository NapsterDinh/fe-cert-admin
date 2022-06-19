const configuration = {
  ApiUrl: "http://localhost:5000",
  setApiRequestToken: (token) => {
    localStorage.setItem('requestToken', JSON.stringify(token))
  },
  removeApiRequestToken: (token) => {
    localStorage.removeItem('requestToken')
  },
  getAPIRequestToken: () => {
    return JSON.parse(localStorage.getItem('requestToken'))
  }
};

export const clientURL = "http://dev.fe-vietnam.vn:3000"

export default configuration;
