import { API_BASE_URL } from "../types/api";
import type { Book, CreateBook } from "../types/book";

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export async function getBooks(): Promise<Book[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/Books`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Unauthorized: Please log in to access books.");
      }
      const text = await res.text();
      throw new Error(text || `Request failed: ${res.status}`);
    }
    return res.json();
  } catch (error: any) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(`Failed to connect to backend at ${API_BASE_URL}. Make sure the backend is running.`);
    }
    throw new Error(error.message || "Failed to fetch books");
  }
}

export async function createBook(payload: CreateBook): Promise<Book> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/Books`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Unauthorized: Please log in to create books.");
      }
      const text = await res.text();
      throw new Error(text || `Request failed: ${res.status}`);
    }
    return res.json();
  } catch (error: any) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(`Failed to connect to backend at ${API_BASE_URL}. Make sure the backend is running.`);
    }
    throw new Error(error.message || "Failed to create book");
  }
}

export async function updateBook(id: number, payload: Book): Promise<void> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/Books/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Unauthorized: Please log in to update books.");
      }
      const text = await res.text();
      throw new Error(text || `Request failed: ${res.status}`);
    }
  } catch (error: any) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(`Failed to connect to backend at ${API_BASE_URL}. Make sure the backend is running.`);
    }
    throw new Error(error.message || "Failed to update book");
  }
}

export async function deleteBook(id: number): Promise<void> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/Books/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Unauthorized: Please log in to delete books.");
      }
      const text = await res.text();
      throw new Error(text || `Request failed: ${res.status}`);
    }
  } catch (error: any) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(`Failed to connect to backend at ${API_BASE_URL}. Make sure the backend is running.`);
    }
    throw new Error(error.message || "Failed to delete book");
  }
}
