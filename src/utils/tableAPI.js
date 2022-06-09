import Axios from "axios";

const callAPI = async ({ url, method, data }) => {
    return await Axios({
      url,
      method,
      data
    });
  };

export { callAPI };
