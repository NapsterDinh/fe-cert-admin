const configuration = {
  ApiUrl: "http://localhost:5000",
  setApiRequestToken: (token) => {
    localStorage.setItem('requestToken', JSON.stringify(token))
  },
  getAPIRequestToken: () => {
    return JSON.parse(localStorage.getItem('requestToken'))
  }
};

export default configuration;
