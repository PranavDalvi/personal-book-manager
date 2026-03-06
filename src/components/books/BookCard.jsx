"use client";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export default function BookCard({ book, onDelete, onEdit }) {
  return (
    <Card>
      <CardContent className="p-4 flex justify-between items-start">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">{book.title}</h3>
          {book.author && (
            <p className="text-sm text-gray-500">{book.author}</p>
          )}
          <div className="flex gap-2 flex-wrap">
            {book.tags?.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <Badge>{book.status.replaceAll("_", " ")}</Badge>
        </div>
        <div className="flex gap-2">
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
