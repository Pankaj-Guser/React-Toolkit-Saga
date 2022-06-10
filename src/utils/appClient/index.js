import axios from "axios";
/**
 * Used to verify the params are all valid and specified in the config object.
 * Param objects are Key/Value pairs where the key is the param name, and the value is an object
 * describing it
 *
 * @param {object} providedParams - The params to validate
 * @param {object} configuredPathParams - The path params to validate against
 * @param {object} configuredQParams - The queryParams params to validate against
 * @throws {ReferenceError} - When any key doesn't match a configured param. Raise this
 *
 * @returns {object} - Returns the passed in, provided params, untouched
 */
const validateParams = (
  providedParams = {},
  configuredPathParams = {},
  configuredQParams = {}
) => {
  Object.keys(providedParams || {}).forEach((key) => {
    if (!configuredPathParams.includes(key) && !(key in configuredQParams)) {
      throw new ReferenceError(
        `There is no param by the name of ${key} configured in your params`
      );
    }
  });
  return providedParams;
};

/**
 * Removes the curly braces from the url string
 * for eg: {testId} would be extracted out as testId
 */
const removeCurlyBraces = (str = "") => `${str}`.replace(/\{|\}/gi, "");

/**
 * Sets up the form data with anything provided by the user,
 * as well as our authentication needed for non get requests
 *
 * @param {object} body - The object of key value pairs to use as the request body
 * @returns {FormData} - body + authentication https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
 */
const formData = (body = {}) => {
  const data = new FormData();
  Object.entries(body).forEach(([k, v]) => {
    data.append(k, v);
  });

  return { data };
};

/**
 * Build the url taking in as `/resource/{id}/` and replacing all curly braces with their values
 *
 * @param {string} url - the configured url
 * @param {array} configuredPathParams - Array of configured path params
 * @param {object} params - Hash of provided params with their values
 * @return {string} it returns the formed url
 */
const buildUrl = (url = "", configuredPathParams = [], params = {}) =>
  configuredPathParams.reduce(
    (acc, param) => acc.replace(param, params[removeCurlyBraces(param)]),
    url
  );

const queryParams = (params = {}, configuredQueryParams = {}) =>
  Object.keys(params || {})
    .filter((k) => Object.keys(configuredQueryParams || {}).includes(k))
    .reduce((acc, k) => ({ ...acc, [k]: (params || {})[k] }), {});

const notImplementedRequestToken = () => {
  // eslint-disable-next-line
  return new Promise((resolve) => {
    resolve(undefined);
  });
};

const axiosDefaults = {
  responseType: "json",
};

const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const defaultOptions = ({ baseUrl, requestToken, headers, ...options }) => ({
  ...options,
  baseURL: baseUrl || "/",
  requestToken: requestToken || notImplementedRequestToken,
  headers: headers || {},
});

const defaultArgs = ({ params = {}, body = {}, ...rest } = {}) => ({
  ...rest,
  params: params || {},
  body: body || {},
});

/**
 * builds out a function with the action's config memoized. The function can
 * be invoked to call the underlying service client with this config
 *
 * @param {object} config - the config from routes for this particular action
 * * @returns {function} - Returns a function that takes a set of args.
 * * @param {...*} args - Currently only supports 1 param. The first param should be an object with
 * a key of params.
 */
const buildActionHandler =
  (config, options = {}) =>
  (args = {}) => {
    const {
      baseURL,
      requestToken,
      headers: optHeaders,
    } = defaultOptions(options);
    const { body, params } = defaultArgs(args);
    const { method, url, type } = config;

    const configuredQParams = config.params || {};
    const configuredPathParams = url.match(/{[A-z_]+}/gm) || []; // non null array
    const configuredPathParamKeys =
      configuredPathParams.map((p) => removeCurlyBraces(p)) || [];
    validateParams(params, configuredPathParamKeys, configuredQParams);

    const bodyData = method !== "GET" ? formData(body) : {};
    const axiosConfig = {
      ...axiosDefaults,
      method,
      baseURL,
      url: buildUrl(url, configuredPathParams, params),
      headers: {
        ...defaultHeaders,
        ...optHeaders,
      },
      params: queryParams(args, configuredQParams),
      ...bodyData,
    };

    if (type === "blob") {
      axiosConfig.responseType = "blob";
    }

    return requestToken().then((authToken) => {
      axiosConfig.headers.Authorization = `Bearer ${authToken}`;
      return axios(axiosConfig).then(({ data }) => data);
    });
  };

const buildResourceActions = (resourceActions = {}, options = {}) =>
  Object.entries(resourceActions || {}).reduce(
    (acc, [k, v]) => ({
      ...acc,
      [k]: buildActionHandler(v, options),
    }),
    {}
  );

export const getBcsToken = (options = {}) => {
  const { requestToken } = defaultOptions(options);
  return requestToken().then((authToken) => authToken);
};

const appClient = (routes = {}, options = {}) =>
  Object.entries(routes || {}).reduce(
    (acc, [k, v]) => ({
      ...acc,
      [k]: buildResourceActions(v, options),
    }),
    {}
  );

export default appClient;
