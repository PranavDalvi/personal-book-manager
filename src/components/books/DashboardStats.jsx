"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function DashboardStats({
  total,
  reading,
  completed,
  wantToRead,
}) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-10 sm:flex-row">
      <Card className="w-full">
        <CardContent className="p-4">
          <p className="text-sm text-gray-500">Total Books</p>
          <p className="text-2xl font-semibold">{total}</p>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardContent className="p-4">
          <p className="text-sm text-gray-500">Currently Reading Books</p>
          <p className="text-2xl font-semibold">{reading}</p>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardContent className="p-4">
          <p className="text-sm text-gray-500">Completed Books</p>
          <p className="text-2xl font-semibold">{completed}</p>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardContent className="p-4">
          <p className="text-sm text-gray-500">Want to Read Books</p>
          <p className="text-2xl font-semibold">{wantToRead}</p>
        </CardContent>
      </Card>
    </div>
  );
}
