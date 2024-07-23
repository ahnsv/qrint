"use client";

import { deletePost } from "@/app/api/posts/actions";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
const DeletePostButton: React.FC<{ slug: string }> = ({ slug }) => {
  const router = useRouter();
  const handleDelete = async () => {
    await deletePost(slug);
    // TODO: revalidate the cache
    router.push("/");
    router.refresh();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2Icon
          size={24}
          className="mx-2 p-1 rounded-sm hover:text-red-300 hover:bg-red-100 transition-colors duration-100 ease-linear"
        />
      </AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>정말 삭제하시겠어요?</AlertDialogTitle>
            <AlertDialogDescription>
              이 작업은 되돌릴 수 없습니다. 계속하시겠어요?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
};
export default DeletePostButton;
