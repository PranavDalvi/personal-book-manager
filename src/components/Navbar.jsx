"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <nav className="w-full border-b bg-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Book Manager</h1>

      <Button variant="outline" onClick={handleLogout}>
        Logout
      </Button>
    </nav>
  );
}
