"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { signup } from "@/services/auth.service";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = await signup(name, email, pwd);

      toast.success("Account created successfully");

      router.push("/login");
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
        <h1 className="text-xl font-semibold">Signup</h1>

        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          onChange={(e) => setPwd(e.target.value)}
          required
        />

        <Button type="submit" className="w-full">
          Create Account
        </Button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
