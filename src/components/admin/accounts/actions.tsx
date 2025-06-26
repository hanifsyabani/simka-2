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
import { ChangeStatusAccount } from "@/service/account";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";

interface ActionsAccountProps {
  isVerified: boolean;
  userId: string;
  refetch: () => void;
}

export default function ActionsAccount({
  isVerified,
  userId,
  refetch,
}: ActionsAccountProps) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: changeStatus } = useMutation({
    mutationFn: (newStatus: boolean) => ChangeStatusAccount(userId, newStatus),
    onSuccess: (_, newStatus) => {
      setIsLoading(false);
      setIsOpenDialog(false);
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: `Akun telah ${
          newStatus ? "disetujui" : "dibatalkan verifikasinya"
        }.`,
      });
      refetch();
    },
    onError: (error: any) => {
      setIsLoading(false);
      setIsOpenDialog(false);
      Swal.fire({
        icon: "error",
        title: "Gagal Memperbarui Status",
        text: error?.response?.data?.message || "Terjadi kesalahan.",
      });
    },
  });

  const handleConfirm = () => {
    setIsLoading(true);
    changeStatus(!isVerified);
  };

  return (
    <>
      <Button
        className={`${
          isVerified ? "bg-red-600" : "bg-green-600"
        } text-white cursor-pointer`}
        onClick={() => setIsOpenDialog(true)}
      >
        {isVerified ? "Batalkan Persetujuan" : "Setujui"}
      </Button>

      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isVerified
                ? "Batalkan Verifikasi Akun?"
                : "Setujui Akun Ini?"}
            </DialogTitle>
            <DialogDescription>
              {isVerified
                ? "Akun ini akan dibatalkan verifikasinya dan tidak dapat login."
                : "Akun ini akan disetujui dan diizinkan login."}
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
              className="bg-green-600 text-white cursor-pointer"
              onClick={handleConfirm}
              disabled={isLoading}
            >
              {isLoading ? <span className="loader-white"/> : "Ya, Lanjutkan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
