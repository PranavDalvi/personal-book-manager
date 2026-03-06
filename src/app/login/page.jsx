"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Loginpage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [pwd, setpwd] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/dashboard");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = await login(email, pwd);

      localStorage.setItem("token", data.token);
      toast.success("Login successful");
      router.push("/dashboard");
    } catch (err) {
      toast.error(`ERROR: ${err.message}`);
    }
  }
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50">
      <h1 className="text-2xl font-bold mb-10">Personal Book Manager</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-lg border bg-white p-6 shadow"
      >
        <h1 className="text-xl font-semibold">Login</h1>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Password"
          value={pwd}
          onChange={(e) => setpwd(e.target.value)}
          required
        />

        <Button type="submit" className="w-full">
          Login
        </Button>

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600">
            Signup
          </a>
        </p>
      </form>
    </div>
  );
}
