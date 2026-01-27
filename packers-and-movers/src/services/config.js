
export const BASE_URL = "http://localhost:4000";

export function getAuthHeader() {
  const token = sessionStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
}