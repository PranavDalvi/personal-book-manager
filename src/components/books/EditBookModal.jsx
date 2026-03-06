"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";

import { updateBook } from "@/services/books.service";

import TagsMultiSelect from "./TagsMultiSelect";

export default function EditBookModal({ book, onClose, onUpdated }) {
  const [title, setTitle] = useState(book.title || "");
  const [author, setAuthor] = useState(book.author || "");
  const [tags, setTags] = useState(book.tags || []);
  const [status, setStatus] = useState(book.status || "want_to_read");

  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      await updateBook(book._id, {
        title,
        author,
        tags,
        status,
      });

      toast.success("Book updated");

      onUpdated?.();
      onClose?.();
    } catch (err) {
      toast.error(err.message || "Failed to update book");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Input
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <TagsMultiSelect tags={tags} setTags={setTags} />

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="want_to_read">Want to Read</SelectItem>

              <SelectItem value="reading">Reading</SelectItem>

              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit" className="w-full">
            {submitting ? "Updating...." : "Update Book"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
