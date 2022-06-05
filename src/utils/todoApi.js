import Axios from "axios";

let callAPI = async ({ url, method, data }) => {
    console.log("methode get called", url)
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
