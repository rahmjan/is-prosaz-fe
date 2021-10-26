import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { RequestForm } from "../forms/RequestForm";

type CreateRequestProps = {
  open: boolean,
  onClose(event: object, reason: string): void
}

export function CreateRequest({ open, onClose }: CreateRequestProps) {
  return (
    <Dialog maxWidth="md" fullWidth open={open} onClose={onClose}>
      <DialogTitle>Nový požadavek</DialogTitle>
      <DialogContent>
        <RequestForm />
      </DialogContent>
    </Dialog>
  );
}