"use client";

import AddBookModal from "@/components/books/AddBookModal";
import BookCard from "@/components/books/BookCard";
import DashboardStats from "@/components/books/DashboardStats";
import EditBookModal from "@/components/books/EditBookModal";
import FilterBar from "@/components/books/FilterBar";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { getToken } from "@/lib/auth";
import { deleteBook, getBooks } from "@/services/books.service";
import { getBooksMetrics } from "@/services/metrics.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function DashboardPage() {
  const router = useRouter();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState(null);

  const [statusFilter, setStatusFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  const [metrics, setMetrics] = useState(null);

  // Simple auth check
  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push("/login");
    }
    fetchMetrics();
  }, []);

  useEffect(() => {
    const token = getToken();

    if (!token) return;
    fetchBooks();
  }, [statusFilter, tagFilter]);

  // Fetch books for the current user with optional filters
  async function fetchBooks() {
    try {
      const filters = {};
      if (statusFilter) {
        filters.status = statusFilter;
      }
      if (tagFilter) {
        filters.tag = tagFilter;
      }
      const data = await getBooks(filters);
      setBooks(data);
    } catch (err) {
      toast.error(`ERROR ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function fetchMetrics() {
    try {
      const data = await getBooksMetrics();
      setMetrics(data);
    } catch (err) {
      toast.error(`ERROR ${err.message}`);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this book?")) return;

    try {
      await deleteBook(id);
      toast.success("Book deleted");
      fetchBooks();
      fetchMetrics();
    } catch (err) {
      toast.error(err.message);
    }
  }

  const totalBooks = books.length;
  const readingBooks = books.filter((book) => book.status === "reading").length;
  const completedBooks = books.filter(
    (book) => book.status === "completed",
  ).length;
  const wantToReadBooks = books.filter(
    (book) => book.status === "want_to_read",
  ).length;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">My Books</h1>
            <AddBookModal
              onBookCreated={() => {
                fetchBooks();
                fetchMetrics();
              }}
            />
          </div>
          {editingBook && (
            <EditBookModal
              book={editingBook}
              onClose={() => setEditingBook(null)}
              onUpdated={() => {
                fetchBooks();
                fetchMetrics();
              }}
            />
          )}
          <FilterBar
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            tagFilter={tagFilter}
            setTagFilter={setTagFilter}
          />

          <DashboardStats
            total={metrics?.total || 0}
            reading={metrics?.reading || 0}
            completed={metrics?.completed || 0}
            wantToRead={metrics?.wantToRead || 0}
          />

          {loading && <p className="text-gray-500">Loading books...</p>}
          {!loading && books.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg font-medium">No books yet</p>
              <p className="text-sm">Add your first book to get started.</p>
            </div>
          )}
          {!loading && books.length > 0 && (
            <div className="space-y-4">
              {books.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  onDelete={handleDelete}
                  onEdit={(book) => setEditingBook(book)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
