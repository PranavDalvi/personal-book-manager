"use client";

import { Button } from "@/components/ui/button";
import { TAG_OPTIONS } from "@/constants/tags";

export default function FilterBar({
  statusFilter,
  setStatusFilter,
  tagFilter,
  setTagFilter,
}) {
  return (
    <div className="flex gap-4 mb-6 items-center flex-wrap">
      <select
        className="border rounded px-3 py-2 bg-white"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="want_to_read">Want to Read</option>
        <option value="reading">Reading</option>
        <option value="completed">Completed</option>
      </select>

      <select
        className="border rounded px-3 py-2 bg-white"
        value={tagFilter}
        onChange={(e) => setTagFilter(e.target.value)}
      >
        <option value="">All Tags</option>
        {TAG_OPTIONS.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      <Button
        variant="outline"
        onClick={() => {
          setStatusFilter("");
          setTagFilter("");
        }}
      >
        Clear
      </Button>
    </div>
  );
}
