import { getAuthHeaders } from "./getAuthHeaders";

export async function getBooks(filters = {}) {
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(`/api/books?${query}`, {
    headers: getAuthHeaders(),
  });
  return res.json();
}

export async function createBook(book) {
  const res = await fetch("/api/books", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(book),
  });
  return res.json();
}

export async function updateBook(id, updates) {
  const res = await fetch(`/api/books/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(updates),
  });

  return res.json();
}

export async function deleteBook(id) {
  console.log("Deleting book:", id);
  const res = await fetch(`/api/books/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete book");
  }

  return data;
}
