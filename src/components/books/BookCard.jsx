"use client";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const statusStyles = {
  want_to_read: "bg-yellow-100 text-yellow-800",
  reading: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
};

export default function BookCard({ book, onDelete, onEdit }) {
  return (
    <Card className="transition hover:shadow-md">
      <CardContent className="p-4 flex justify-between items-start">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold leading-tight">{book.title}</h3>
          {book.author && (
            <p className="text-sm text-gray-500">{book.author}</p>
          )}
          <div className="flex gap-2 flex-wrap mt-1">
            {book.tags?.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <span
            className={`text-xs px-2 py-1 rounded-full ${statusStyles[book.status]}`}
          >
            {book.status.replaceAll("_", " ")}
          </span>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={() => onEdit(book)}>
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(book._id)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
