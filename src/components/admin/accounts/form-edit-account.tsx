"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  Building,
  Briefcase,
  Shield,
  CheckCircle,
  XCircle,
  MoveLeft,
  CircleChevronLeft,
} from "lucide-react";
import { departments, positions } from "@/lib/items";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EditAccount, GetAccount } from "@/service/account";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";

const schema = z.object({
  fullname: z.string().min(1, "Nama lengkap harus diisi"),
  email: z.string().email("Email tidak valid").min(1, "Email harus diisi"),
  phone: z.string().optional(),
  department: z.string().optional(),
  position: z.string().optional(),
  role: z.enum(["employee", "admin"], {
    errorMap: () => ({ message: "Role harus dipilih" }),
  }),
});
type FormFields = z.infer<typeof schema>;

export default function FormEditAccount({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { data: dataAccount, isLoading: isLoadingAccount } = useQuery({
    queryFn: () => GetAccount(id),
    queryKey: ["account", id],
  });

  const { mutate: editAccount } = useMutation({
    mutationFn: (data: FormFields) => EditAccount(id, data),
    onSuccess: () => {
      setIsLoading(false);
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Akun berhasil diperbarui.",
      });
      router.push("/admin/accounts");
    },
    onError: (error: any) => {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Gagal Memperbarui Akun",
        text: error?.response?.data?.message || "Terjadi kesalahan.",
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      role: "employee",
    },
  });

  useEffect(() => {
    if (dataAccount?.data?.user && !isLoadingAccount) {
      const user = dataAccount.data.user

      reset({
        fullname: user.fullname || "",
        email: user.email || "",
        phone: user.phone || "",
        department: user.department || "",
        position: user.position || "",
        role: user.role === "admin" ? "admin" : "employee",
      });

      setValue("department", user.department || "");
      setValue("position", user.position || "");
      setValue("role", user.role === "admin" ? "admin" : "employee");
    }
  }, [dataAccount, isLoadingAccount, reset, setValue]);

  function onSubmit(data: FormFields) {
    setIsLoading(true);
    editAccount(data);
  }

  if (isLoadingAccount) return <div className="loader" />;

  const user = dataAccount?.data?.user;

  return (
    <div className="mx-auto p-6 space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href={"/admin/accounts"}
                className="text-blue-950 hover:underline"
              >
                <CircleChevronLeft />
              </Link>
              <div>
                <CardTitle className="text-2xl  font-bold text-gray-900">
                  Edit User Account
                </CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                  Update user information and account settings
                </CardDescription>
              </div>
            </div>
            <Badge
              variant={user?.isVerified ? "default" : "secondary"}
              className="flex items-center gap-1 bg-green-700"
            >
              {user?.isVerified ? (
                <CheckCircle className="w-3 h-3" />
              ) : (
                <XCircle className="w-3 h-3" />
              )}
              {user?.isVerified ? "Verified" : "Unverified"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="fullname"
                    className="text-sm font-medium text-gray-700"
                  >
                    Full Name *
                  </Label>
                  <Input
                    id="fullname"
                    type="text"
                    {...register("fullname")}
                    placeholder="Enter full name"
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.fullname && (
                    <p className="text-sm text-red-600">
                      {errors.fullname.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 flex items-center gap-1"
                  >
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700 flex items-center gap-1"
                >
                  <Phone className="w-4 h-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  placeholder="Enter phone number"
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Building className="w-5 h-5" />
                Work Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="department"
                    className="text-sm font-medium text-gray-700"
                  >
                    Department
                  </Label>

                  <Controller
                    control={control}
                    name="department"
                    render={({ field }) => (
                      <Select
                        value={field.value ?? ""} 
                        onValueChange={(value) => field.onChange(value || "")} 
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
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="position"
                    className="text-sm font-medium text-gray-700 flex items-center gap-1"
                  >
                    <Briefcase className="w-4 h-4" />
                    Position
                  </Label>

                  <Controller
                    control={control}
                    name="position"
                    render={({ field }) => (
                      <Select
                        value={field.value ?? ""} 
                        onValueChange={(value) => field.onChange(value || "")}
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
                    )}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Account Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="role"
                    className="text-sm font-medium text-gray-700"
                  >
                    User Role *
                  </Label>
                  <Controller
                    control={control}
                    name="role"
                    render={({ field }) => (
                      <Select
                        value={field.value ?? ""} 
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="employee">Employee</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {errors.role && (
                    <p className="text-sm text-red-600">
                      {errors.role.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Account Verification
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant={user?.isVerified ? "default" : "outline"}
                      size="sm"
                      className="flex items-center gap-2 bg-green-600 transition-all duration-200"
                    >
                      {user?.isVerified ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Verified
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" />
                          Unverified
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="px-6 transition-all duration-200 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="px-6 transition-all duration-200 bg-blue-950 hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="loader-white" />
                ) : (
                  "Update Account"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
