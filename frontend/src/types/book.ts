export type Book = {
  id: number;
  title: string;
  author: string;
  description?: string | null;
  isbn?: string | null;
  publishedDate?: string | null;     // ISO string from API
  availableCopies?: number | null;
};

export type CreateBook = Omit<Book, "id">;
