import { getAuthHeaders } from "./getAuthHeaders";

export async function getBooksMetrics() {
  const res = await fetch(`/api/metrics`, {
    headers: getAuthHeaders(),
  });
  return res.json();
}
