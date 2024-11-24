import * as S from "./DeleteButton.Styles";

interface DeleteButtonProps {
  deleteInput: string;
  isDeleting: boolean;
  handleDelete: () => void;
}

export function DeleteButton({
  handleDelete,
  deleteInput,
  isDeleting,
}: DeleteButtonProps) {
  return (
    <S.DeleteButton
      onClick={handleDelete}
      disabled={deleteInput !== "delete" || isDeleting}
      $isActive={deleteInput === "delete"}
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </S.DeleteButton>
  );
}
