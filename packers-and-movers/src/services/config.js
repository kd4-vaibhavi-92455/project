export const BASE_URL = "http://localhost:8080";

export function getAuthHeader() {
  const token = sessionStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
}
