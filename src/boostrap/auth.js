import axiosClient from "./axiosClient";

export const AUTH_TOKEN = "access_token";
export const PROFILE = "user";

export function setAccessToken(token) {
  localStorage.setItem(AUTH_TOKEN, token);
}

export function getAccessToken() {
  return localStorage.getItem(AUTH_TOKEN);
}

export function clearAccessToken() {
  localStorage.removeItem(PROFILE);
  localStorage.removeItem(AUTH_TOKEN);
}

export function onLogout() {
  clearAccessToken();
}

// AUTH

export async function logout() {
  try {
    const result = await axiosClient({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/logout`,
    });

    if (result.status === 200) {
      logout();
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function login(args) {
  const { payload } = args;

  try {
    const result = await axiosClient({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/api/login`,
      data: JSON.stringify({ payload }),
    });

    if (result.status !== 200) return false;

    const { access_token = "" } = result.data;
    return access_token;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
