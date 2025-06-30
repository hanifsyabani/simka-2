"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChangeStatusAccount, DeleteAccount } from "@/service/account";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";

interface DialogAccountProps {
  Id: string;
  task: string;
  isOpenDialog: boolean;
  setIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}

export default function DialogKaryawan({
  task,
  isOpenDialog,
  setIsOpenDialog,
  Id,
  refetch,
}: DialogAccountProps) {
  const [isLoading, setIsLoading] = useState(false);

  //   const { mutate: changeStatus } = useMutation({
  //     mutationFn: (newStatus: boolean) => ChangeStatusAccount(Id, newStatus),
  //     onSuccess: (_, newStatus) => {
  //       setIsLoading(false);
  //       setIsOpenDialog(false);
  //       Swal.fire({
  //         icon: "success",
  //         title: "Berhasil",
  //         text: `Akun telah ${
  //           newStatus ? "disetujui" : "dibatalkan verifikasinya"
  //         }.`,
  //       });
  //       refetch();
  //     },
  //     onError: (error: any) => {
  //       setIsLoading(false);
  //       setIsOpenDialog(false);
  //       Swal.fire({
  //         icon: "error",
  //         title: "Gagal Memperbarui Status",
  //         text: error?.response?.data?.message || "Terjadi kesalahan.",
  //       });
  //     },
  //   });

  const { mutate: deleteAccount } = useMutation({
    mutationFn: () => DeleteAccount(Id),
    onSuccess: () => {
      setIsLoading(false);
      setIsOpenDialog(false);
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Akun telah dihapus.",
      });
      refetch();
    },
    onError: (error: any) => {
      setIsLoading(false);
      setIsOpenDialog(false);
      Swal.fire({
        icon: "error",
        title: "Gagal Menghapus Akun",
        text: error?.response?.data?.message || "Terjadi kesalahan.",
      });
    },
  });

  const handleConfirm = () => {
    if (task === "changeStatus") {
      setIsLoading(true);
    } else {
      setIsLoading(true);
      deleteAccount();
    }
  };

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {"Hapus Karyawan"}
          </DialogTitle>
          <DialogDescription>
       
            Apakah Anda yakin ingin menghapus karyawan ini? Tindakan ini tidak dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpenDialog(false)}
            disabled={isLoading}
          >
            Batal
          </Button>
          <Button
            className="bg-red-600 text-white cursor-pointer"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? <span className="loader-white" /> : "Ya, Lanjutkan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
