import Axios from "axios";

let callAPI = async ({ url, method, data }) => {
    return await Axios({
      url,
      method,
      data
    });
  };

const todoApi = {
    callAPI
}

export default todoApi;
