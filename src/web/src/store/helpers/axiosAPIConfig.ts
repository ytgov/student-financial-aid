// A small wrapper for axios to include a jwt with the api request

import axios from "axios";

import { AuthState } from "@/plugins/auth";

export function SecureAPICall(method: string, config?: any) {
  let headers = {
    "Content-Type": "application/json",
  };
  if (AuthState.token) {
    Object.assign(headers, { Authorization: `Bearer ${AuthState.token}` });
  }
  return axios.create({
    method: method,
    headers: headers,
    ...config,
  });
}

export function SecureAPIUpload(method: string) {
  let headers = {
    "Content-Type": "multipart/form-data",
  };
  if (AuthState.token) {
    Object.assign(headers, { Authorization: `Bearer ${AuthState.token}` });
  }
  return axios.create({
    method: method,
    headers: headers,
  });
}
