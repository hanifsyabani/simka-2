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

export default function FormRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    // Simulasi loading
    setTimeout(() => {
      setIsLoading(false);
      console.log("Register attempt:", formData);
      // Redirect logic would go here
    }, 2000);
  };

  const departments = [
    "Human Resources",
    "Finance",
    "Marketing",
    "IT Department",
    "Operations",
    "Sales",
    "Customer Service",
  ];

  const positions = [
    "Manager",
    "Supervisor",
    "Staff",
    "Coordinator",
    "Analyst",
    "Specialist",
    "Assistant",
  ];

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

            <div className="flex items-center justify-center mt-6 space-x-4">
              <div
                className={`flex items-center space-x-2 ${
                  currentStep >= 1 ? "text-white" : "text-blue-300"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= 1 ? "bg-white text-blue-950" : "bg-white/20"
                  }`}
                >
                  {currentStep > 1 ? <CheckCircle className="w-5 h-5" /> : "1"}
                </div>
                <span className="text-sm font-medium">Info Pribadi</span>
              </div>
              <div
                className={`w-8 h-0.5 ${
                  currentStep >= 2 ? "bg-white" : "bg-white/30"
                }`}
              ></div>
              <div
                className={`flex items-center space-x-2 ${
                  currentStep >= 2 ? "text-white" : "text-blue-300"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= 2 ? "bg-white text-blue-950" : "bg-white/20"
                  }`}
                >
                  2
                </div>
                <span className="text-sm font-medium">Password</span>
              </div>
            </div>
          </div>

          <div className="px-8 py-8">
            {currentStep === 1 && (
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
                  <Label htmlFor="fullName" className="text-blue-950">
                    Nama Lengkap *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 z-10" />
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="pl-11 bg-blue-50/30 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Masukkan nama lengkap"
                    />
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
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-11 bg-blue-50/30 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="nama@email.com"
                    />
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
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-11 bg-blue-50/30 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="08xx-xxxx-xxxx"
                    />
                  </div>
                </div>

                <div className="flex w-full items-center ">
                  <div className="space-y-2 w-1/2">
                    <Label htmlFor="department" className="text-blue-950">
                      Departemen *
                    </Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 z-10" />
                      <Select value={formData.department}>
                        <SelectTrigger className="pl-11 bg-blue-50/30 border-blue-200 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue placeholder="Pilih departemen" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2 w-1/2">
                    <Label htmlFor="position" className="text-blue-950">
                      Jabatan *
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 z-10" />
                      <Select value={formData.position}>
                        <SelectTrigger className="pl-11 bg-blue-50/30 border-blue-200 focus:border-blue-500 focus:ring-blue-500">
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
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleNextStep}
                  className="w-full bg-gradient-to-r from-blue-950 to-blue-800 hover:from-blue-900 hover:to-blue-700 text-white"
                  size="lg"
                >
                  <span>Lanjutkan</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-blue-950 mb-2">
                    Keamanan Akun
                  </h3>
                  <p className="text-sm text-blue-600">
                    Buat password yang kuat untuk akun Anda
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-blue-950">
                    Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 z-10" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleInputChange}
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-blue-950">
                    Konfirmasi Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 z-10" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
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
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-blue-600">
                    Kekuatan Password:
                  </div>
                  <div className="flex space-x-1">
                    <div
                      className={`h-2 flex-1 rounded ${
                        formData.password && formData.password.length >= 8
                          ? "bg-green-400"
                          : "bg-gray-200"
                      }`}
                    ></div>
                    <div
                      className={`h-2 flex-1 rounded ${
                        formData.password &&
                        formData.password.length >= 8 &&
                        /[A-Z]/.test(formData.password)
                          ? "bg-green-400"
                          : "bg-gray-200"
                      }`}
                    ></div>
                    <div
                      className={`h-2 flex-1 rounded ${
                        formData.password &&
                        formData.password.length >= 8 &&
                        /[A-Z]/.test(formData.password) &&
                        /[0-9]/.test(formData.password)
                          ? "bg-green-400"
                          : "bg-gray-200"
                      }`}
                    ></div>
                  </div>
                  <div className="text-xs text-blue-500">
                    Password harus minimal 8 karakter, mengandung huruf besar
                    dan angka
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      className="mt-1 border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label
                      htmlFor="agreeTerms"
                      className="text-sm text-blue-700 leading-relaxed cursor-pointer"
                    >
                      Saya setuju dengan{" "}
                      <Button
                        variant="link"
                        className="text-blue-600 underline hover:text-blue-800 p-0 h-auto font-normal"
                      >
                        Syarat & Ketentuan
                      </Button>{" "}
                      dan{" "}
                      <Button
                        variant="link"
                        className="text-blue-600 underline hover:text-blue-800 p-0 h-auto font-normal"
                      >
                        Kebijakan Privasi
                      </Button>{" "}
                      yang berlaku
                    </Label>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={handlePrevStep}
                    variant="outline"
                    className="flex-1 border-blue-200 text-blue-950 hover:bg-blue-50"
                    size="lg"
                  >
                    Kembali
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading || !formData.agreeTerms}
                    className="flex-1 bg-gradient-to-r from-blue-950 to-blue-800 hover:from-blue-900 hover:to-blue-700 text-white"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        <span>Mendaftar...</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-5 h-5 mr-2" />
                        <span>Daftar</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

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
        </div>

        <Credit />
      </div>
    </div>
  );
}
