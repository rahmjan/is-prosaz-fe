import { Dialog, DialogContent, DialogTitle, Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import { CreateRepetitionDto } from "../../api/requests";
import { RepetitionForm, RepetitionTable } from "../forms/RepetitionForm";
import { RequestForm } from "../forms/RequestForm";

type CreateRequestProps = {
  open: boolean,
  onClose(event: object, reason: string): void
}

export function CreateRequest({ open, onClose }: CreateRequestProps) {

  const [repetitions, setRepetitions] = useState<CreateRepetitionDto[]>([]);

  const addRepetition = (repetition: CreateRepetitionDto) => setRepetitions([...repetitions, repetition]);
  const deleteRepetition = (repetition: CreateRepetitionDto) => setRepetitions(repetitions.filter(r => r !== repetition));

  return (
    <Dialog maxWidth="md" fullWidth open={open} onClose={onClose}>
      <DialogTitle>Nový požadavek</DialogTitle>
      <DialogContent>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <RequestForm />
          </Grid>
          <Grid item>
            <Typography variant="overline">Opakování</Typography>

            <RepetitionForm onSubmit={addRepetition} />

            <RepetitionTable repetitions={repetitions} onDelete={deleteRepetition} />
          </Grid>
        </Grid>

      </DialogContent>
    </Dialog>
  );
}