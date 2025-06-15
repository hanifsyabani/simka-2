"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Building2, User, Lock, ArrowRight } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import Link from "next/link";
import Credit from "../credit";
import { useMutation } from "@tanstack/react-query";
import { Login } from "@/service/auth";
import Swal from "sweetalert2";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
type FormFields = z.infer<typeof schema>;

export default function FormLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const { mutate: login } = useMutation({
    mutationFn: (data: FormFields) => Login("email", "password"),
    onSuccess: () => {
      setIsLoading(false);
      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: "Selamat datang di Sistem Manajemen Kantor",
      });
      router.push("/");
    },
    onError: () => {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: "Email atau password salah",
      });
    },
  });

  function handleLogin(data: FormFields) {
    setIsLoading(true);
    login(data);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-blue-100/25 bg-[size:20px_20px] opacity-30"></div>

      <div className="relative w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-950 to-blue-800 px-8 py-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4 backdrop-blur-sm">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Sistem Manajemen Kantor
            </h1>
            <p className="text-blue-100 text-sm">
              Masuk ke dashboard administrasi
            </p>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="px-8 py-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email atau Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="text"
                    {...register("email")}
                    placeholder="Masukkan email atau username"
                    className="ml-10"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="Masukkan password"
                    className="ml-10"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                  <Button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-blue-700">Ingat saya</span>
                </label>
                <Button
                  type="button"
                  className="text-blue-600 bg-white hover:text-blue-800 hover:bg-white font-medium transition-colors"
                >
                  Lupa password?
                </Button>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-950 to-blue-800 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-900 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <span>{isLoading ? "Loading..." : "Masuk"}</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
              <div className="text-sm text-center">
                Belum punya akun?{" "}
                <Link
                  href={"/register"}
                  className="font-medium text-blue-600 hover:underline"
                >
                  Daftar
                </Link>
              </div>
            </div>
          </form>
        </div>

        <Credit />
      </div>
    </div>
  );
}
