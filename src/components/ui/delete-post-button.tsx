import { Trash2Icon } from "lucide-react";
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
import { deletePost } from "@/app/api/posts/actions";
const DeletePostButton: React.FC<{ slug: string }> = ({ slug }) => {
  const handleDelete = async () => {
    await deletePost(slug);
    // TODO: revalidate the cache
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
