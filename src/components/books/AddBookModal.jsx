"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

import { createBook } from "@/services/books.service";

import TagsMultiSelect from "./TagsMultiSelect";

export default function AddBookModal({ onBookCreated }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState("want_to_read");

  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const book = {
        title,
        author,
        tags,
        status,
      };
      await createBook(book);
      toast.success("Book added successfully");
      onBookCreated?.();
      setTitle("");
      setAuthor("");
      setTags([]);
      setStatus("want_to_read");
    } catch (err) {
      toast.error(`ERROR: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Book</Button>
      </DialogTrigger>

      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>Add Book</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            autoFocus
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
            <SelectTrigger className="w-full h-10">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="want_to_read">Want to Read</SelectItem>

              <SelectItem value="reading">Reading</SelectItem>

              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Button
            type="submit"
            className="w-full"
            disabled={!title || submitting}
          >
            {submitting ? "Saving..." : "Add Book"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
