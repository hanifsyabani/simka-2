"use client";

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Building2,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  UserPlus,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Credit from "../credit";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { Register } from "@/service/auth";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { departments, positions } from "@/lib/items";

const schema = z
  .object({
    fullname: z.string().min(1, "Nama lengkap wajib diisi"),
    email: z.string().email("Email tidak valid"),
    password: z
      .string()
      .min(8, "Password minimal 8 karakter")
      .regex(/[a-z]/, "Password harus mengandung huruf kecil")
      .regex(/[A-Z]/, "Password harus mengandung huruf besar")
      .regex(/[0-9]/, "Password harus mengandung angka"),
    confirmPassword: z
      .string()
      .min(8, "Konfirmasi password minimal 8 karakter"),
    position: z.string().min(1, "Jabatan wajib dipilih"),
    department: z.string().min(1, "Departemen wajib dipilih"),
    phone: z.string().min(10, "Nomor telepon minimal 10 digit"),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: "Anda harus menyetujui syarat dan ketentuan",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  });

type FormFields = z.infer<typeof schema>;

export default function FormRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      position: "",
      department: "",
      phone: "",
      agreeTerms: false,
    },
  });

  const watchedPassword = watch("password");
  const watchedAgreeTerms = watch("agreeTerms");

  const { mutate: registerUser } = useMutation({
    mutationFn: (data: FormFields) => Register(data),
    onSuccess: () => {
      setIsLoading(false);
      Swal.fire({
        icon: "success",
        title: "Registrasi Berhasil",
        text: "Silahkan menunggu konfirmasi dari admin",
      });
      router.push("/login");
    },
    onError: (error: any) => {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Registrasi Gagal",
        text: error.response.data.message,
      });
    },
  });

  function onSubmit(data: FormFields) {
    setIsLoading(true);
    registerUser(data);
  }

  const getPasswordStrength = (password: string) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(watchedPassword || "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-blue-100/25 bg-[size:20px_20px] opacity-30"></div>

      <div className="relative w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-950 to-blue-800 px-8 py-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4 backdrop-blur-sm">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Daftar Akun Baru
            </h1>
            <p className="text-blue-100 text-sm">
              Bergabung dengan sistem manajemen kantor
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-8 py-8">
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-blue-950 mb-2">
                    Informasi Pribadi
                  </h3>
                  <p className="text-sm text-blue-600">
                    Lengkapi data diri Anda
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullname" className="text-blue-950">
                    Nama Lengkap *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 z-10" />
                    <Input
                      id="fullname"
                      type="text"
                      {...register("fullname")}
                      className="pl-11 bg-blue-50/30 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Masukkan nama lengkap"
                    />
                    {errors.fullname && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.fullname.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-blue-950">
                    Email *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 z-10" />
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="pl-11 bg-blue-50/30 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="nama@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-blue-950">
                    Nomor Telepon *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 z-10" />
                    <Input
                      id="phone"
                      type="tel"
                      {...register("phone")}
                      className="pl-11 bg-blue-50/30 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="08xx-xxxx-xxxx"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex w-full items-start space-x-4">
                  <div className="space-y-2 w-1/2">
                    <Label htmlFor="department" className="text-blue-950">
                      Departemen *
                    </Label>
                    <Select
                      onValueChange={(value) => setValue("department", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih departemen" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dep) => (
                          <SelectItem key={dep} value={dep}>
                            {dep}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.department && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.department.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 w-1/2">
                    <Label htmlFor="position" className="text-blue-950">
                      Jabatan *
                    </Label>
                    <Select
                      onValueChange={(value) => setValue("position", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih jabatan" />
                      </SelectTrigger>
                      <SelectContent>
                        {positions.map((pos) => (
                          <SelectItem key={pos} value={pos}>
                            {pos}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.position && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.position.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-blue-950">
                      Password *
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 z-10" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        className="pl-11 pr-12 bg-blue-50/30 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Minimal 8 karakter"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600 h-auto p-1"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </Button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-blue-950">
                      Konfirmasi Password *
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 z-10" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        {...register("confirmPassword")}
                        className="pl-11 pr-12 bg-blue-50/30 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Ulangi password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600 h-auto p-1"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </Button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="agreeTerms"
                        onCheckedChange={(checked) =>
                          setValue("agreeTerms", !!checked)
                        }
                        checked={watchedAgreeTerms}
                        className="mt-1 border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <Label
                        htmlFor="agreeTerms"
                        className="text-sm text-blue-700 leading-relaxed cursor-pointer"
                      >
                        Saya setuju dengan{" "}
                        <Button
                          type="button"
                          variant="link"
                          className="text-blue-600 underline hover:text-blue-800 p-0 h-auto font-normal"
                        >
                          Syarat & Ketentuan
                        </Button>{" "}
                        dan{" "}
                        <Button
                          type="button"
                          variant="link"
                          className="text-blue-600 underline hover:text-blue-800 p-0 h-auto font-normal"
                        >
                          Kebijakan Privasi
                        </Button>{" "}
                        yang berlaku
                      </Label>
                    </div>
                    {errors.agreeTerms && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.agreeTerms.message}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      type="submit"
                      disabled={isLoading || !watchedAgreeTerms}
                      className="flex-1 bg-gradient-to-r cursor-pointer from-blue-950 to-blue-800 hover:from-blue-900 hover:to-blue-700 text-white disabled:opacity-50"
                      size="lg"
                    >
                      <UserPlus className="w-5 h-5 mr-2" />
                      {isLoading ? <span className="loader-white" /> : "Daftar"}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-blue-100 text-center">
                <p className="text-sm text-blue-600 ">
                  Sudah punya akun?{" "}
                  <Link
                    href={"/login"}
                    className="text-blue-700 cursor-pointer font-medium hover:text-blue-900 p-0 h-auto"
                  >
                    Masuk di sini
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>

        <Credit />
      </div>
    </div>
  );
}
