import Axios from "axios";

const axiosDefaults = {
  responseType: 'json',
};
const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};


const callAPI = async ( body ) => {
  const {method, bodyData, url } = body;
  const axiosConfig = {
    ...axiosDefaults,
    method: method || 'GET' ,
    url,
    headers: {
      ...defaultHeaders
    },
    ...bodyData
  };
    return await Axios(axiosConfig).then((result) => result)
  };

export { callAPI };
