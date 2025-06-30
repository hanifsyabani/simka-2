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
  CircleChevronLeft,
} from "lucide-react";
import { departments, positions } from "@/lib/items";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EditAccount, GetAccount, GetListAccounts } from "@/service/account";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  EditKaryawan,
  GetKaryawanById,
  PostKaryawan,
} from "@/service/karyawan";
import { GetAllCabang } from "@/service/cabang";

const schema = z.object({
  fullname: z.string().min(1, "Nama lengkap harus diisi"),
  phone: z.string().optional(),
  department: z.string().optional(),
  position: z.string().optional(),
  userId: z.string().min(1, "Akun harus dipilih"),
  branchId: z.string().optional(),
});
type FormFields = z.infer<typeof schema>;

export default function FormeEditKaryawan({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { data: dataKaryawan, isLoading: isLoadingKaryawan } = useQuery({
    queryFn: () => GetKaryawanById(id),
    queryKey: ["dataKaryawanById", id],
  });

  const { data: dataAccounts, isLoading: isLoadingAccounts } = useQuery({
    queryFn: () => GetListAccounts(),
    queryKey: ["dataAccounts"],
  });

  const { data: dataCabang, isLoading: isLoadingCabang } = useQuery({
    queryFn: () => GetAllCabang(),
    queryKey: ["dataCabang"],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullname: "",
      phone: "",
      department: "",
      position: "",
      userId: "",
      branchId: "",
    },
  });

  useEffect(() => {
    if (dataKaryawan?.data?.karyawan && !isLoadingKaryawan) {
      const karyawan = dataKaryawan.data.karyawan;

      setValue("fullname", karyawan.fullname || "");
      setValue("phone", karyawan.phone);
      setValue("department", karyawan.department || "");
      setValue("position", karyawan.position || "");
      setValue("userId", karyawan.userId || "");
      setValue("branchId", karyawan.branchId || "");

      setTimeout(() => {
        reset({
          fullname: karyawan.fullname || "",
          phone: karyawan.phone || "",
          department: karyawan.department || "",
          position: karyawan.position || "",
          userId: karyawan.userId || "",
          branchId: karyawan.branchId || "",
        });
      }, 100);
    }
  }, [dataKaryawan, isLoadingKaryawan, reset, setValue]);

  const { mutate: editKaryawan } = useMutation({
    mutationFn: (data: FormFields) => EditKaryawan(id, data),
    onSuccess: () => {
      setIsLoading(false);
      Swal.fire({
        title: "Sukses",
        text: "Karyawan berhasil diperbarui",
        icon: "success",
        confirmButtonText: "OK",
      });

      router.push("/admin/karyawan");
    },
    onError: (error: any) => {
      setIsLoading(false);
      Swal.fire({
        title: "Error",
        text: error.message || "Terjadi kesalahan saat mengedit karyawan",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  function onSubmit(data: FormFields) {
    setIsLoading(true);
    editKaryawan(data);
  }


  if (isLoadingKaryawan || isLoadingCabang || isLoadingAccounts)
    return <div className="loader-white" />;

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
                  Edit Karyawan
                </CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                  Edit informasi karyawan di sini. Pastikan semua data yang
                  dimasukkan sudah benar.
                </CardDescription>
              </div>
            </div>
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

              <div className="space-y-2 mt-4">
                <Label
                  htmlFor="akun"
                  className="text-sm font-medium text-gray-700 flex items-center gap-1"
                >
                  Akun
                </Label>
                <Select
                  value={watch("userId") || ""}
                  onValueChange={(value) => setValue("userId", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih akun" />
                  </SelectTrigger>
                  <SelectContent>
                    {dataAccounts?.data?.user.map((account: any) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.userId && (
                  <p className="text-sm text-red-600">
                    {errors.userId.message}
                  </p>
                )}
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

                  <Select
                    value={watch("department") || ""}
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
                    <p className="text-sm text-red-600">
                      {errors.department.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="position"
                    className="text-sm font-medium text-gray-700 flex items-center gap-1"
                  >
                    <Briefcase className="w-4 h-4" />
                    Position
                  </Label>

                  <Select
                    value={watch("position") || ""}
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
                    <p className="text-sm text-red-600">
                      {errors.position.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="cabang"
                    className="text-sm font-medium text-gray-700 flex items-center gap-1"
                  >
                    <Building className="w-4 h-4" />
                    Cabang
                  </Label>

                  <Select
                    value={watch("branchId") || ""}
                    onValueChange={(value) => setValue("branchId", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih cabang" />
                    </SelectTrigger>
                    <SelectContent>
                      {dataCabang?.data?.cabang.map((cabang: any) => (
                        <SelectItem key={cabang.id} value={cabang.id}>
                          {cabang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

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
                className="px-6 transition-all duration-200 cursor-pointer bg-blue-950 hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="loader-white" />
                ) : (
                  "Tambah Karyawan"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
