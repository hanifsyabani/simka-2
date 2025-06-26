"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Logout } from "@/service/auth";
import Swal from "sweetalert2";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

export default function LogoutComponent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const {mutate: logout} = useMutation({
    mutationFn: () => Logout(),
    onSuccess: () => {
      setIsLoading(false);
      Swal.fire({
        icon: "success",
        title: "Logout Berhasil",
        text: "Anda telah berhasil logout.",
      });
      router.push("/login");
    },
    onError: (error: any) => {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Logout Gagal",
        text:
          error?.response?.data?.message || "Terjadi kesalahan saat logout.",
      });
    },
  });
  return (
    <>
      <Button className="bg-blue-950 text-white hover:bg-blue-800 cursor-pointer" onClick={() => setIsOpenDialog(true)}>
        <LogOut /> Sign Out
      </Button>


      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Logout</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin logout?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => {
                // Handle cancel action
              }}
            >
              Batal
            </Button>
            <Button
              onClick={() => {
                setIsLoading(true);
                logout();
              }}
              disabled={isLoading}
              className="bg-red-600 text-white hover:bg-red-500 cursor-pointer"
            >
              {isLoading ? <span className="loader-white"/> : "Logout"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
