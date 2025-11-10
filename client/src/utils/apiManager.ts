import axios from 'axios';

export const Method = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete'
} as const;

function addPathParamsToURL(url: string, params: any): string {
  if (params) {
    return `${url}${params}`;
  }
  return url;
}

const getGenericHeaders = (adHeaders?: object): object => {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    ...adHeaders
  };
};

export async function apiGenericHandler(
  method: string,
  endPoint: string,
  body?: any | null,
  params?: any
) {
  const customURL = addPathParamsToURL(
    process.env.REACT_APP_BACKEND_BASE_URL + endPoint,
    params
  );

  try {
    const response = await axios({
      method: method.toLowerCase(),
      url: customURL,
      data: body ? body : undefined,
      headers: getGenericHeaders()
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}
