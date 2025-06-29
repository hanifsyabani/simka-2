"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  User,

  CircleChevronLeft,
  Map,
} from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PostCabang } from "@/service/cabang";

const schema = z.object({
  name: z.string().min(1, "Nama lengkap harus diisi"),
  address: z.string().optional(),

});
type FormFields = z.infer<typeof schema>;

export default function FormAddCabang() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const { mutate: addCabang } = useMutation({
    mutationFn: (data: FormFields) => PostCabang(data),
    onSuccess: () => {
      setIsLoading(false);
      Swal.fire({
        title: "Sukses",
        text: "Cabang berhasil ditambahkan",
        icon: "success",
        confirmButtonText: "OK",
      });

      router.push("/admin/cabang");
    },
    onError: (error: any) => {
      setIsLoading(false);
      Swal.fire({
        title: "Error",
        text: error.message || "Terjadi kesalahan saat menambahkan cabang",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  function onSubmit(data: FormFields) {
    setIsLoading(true);
    addCabang(data);
  }


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
                  Tambah Cabang
                </CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                    Silakan isi form berikut untuk menambahkan cabang baru.
                    Pastikan semua data yang dimasukkan sudah benar.
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
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Nama Cabang
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    {...register("name")}
                    placeholder="Enter full name"
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label
                  htmlFor="address"
                  className="text-sm font-medium text-gray-700 flex items-center gap-1"
                >
                  <Map className="w-4 h-4" />
                  Address
                </Label>
                <Input
                  id="address"
                  type="tel"
                  {...register("address")}
                  placeholder="Enter address number"
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
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
                  "Tambah Cabang"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
