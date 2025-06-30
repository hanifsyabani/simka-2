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
import { Check, Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import DialogKaryawan from "./dialog-karyawan";

interface ActionsAccountProps {
  Id: string;
  refetch: () => void;
}

export default function ActionsKaryawan({ Id, refetch }: ActionsAccountProps) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [task, setTask] = useState("");
  const router = useRouter();

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          className="bg-blue-600 text-white cursor-pointer"
          onClick={() => router.push(`/admin/karyawan/${Id}`)}
        >
          <Edit />
        </Button>
        <Button
          className="bg-red-600 text-white cursor-pointer"
          onClick={() => (setIsOpenDialog(true), setTask("delete"))}
        >
          <Trash />
        </Button>
      </div>

      <DialogKaryawan
        Id={Id}
        task={task}
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        refetch={refetch}
      />
    </>
  );
}
