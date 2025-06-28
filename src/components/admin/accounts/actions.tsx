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
import DialogAccount from "./dialog-account";

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
  const [task, setTask] = useState("");
  const router = useRouter();

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          className={`bg-green-600 text-white cursor-pointer`}
          onClick={() => (setIsOpenDialog(true), setTask("changeStatus"))}
          disabled={isVerified}
        >
          <Check />
        </Button>
        <Button
          className="bg-blue-600 text-white cursor-pointer"
          onClick={() => router.push(`/admin/accounts/${userId}`)}
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

      <DialogAccount
        task={task}
        isVerified={isVerified}
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        userId={userId}
        refetch={refetch}
      />
    </>
  );
}
