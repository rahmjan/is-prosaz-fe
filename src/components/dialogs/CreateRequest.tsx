import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import { CreateRepetitionDto, createRequest, CreateRequestDto } from "../../api/requests";
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

  const submitRequest = async (request: CreateRequestDto) => {
    console.log("final data");
    console.log(request);
    console.log(repetitions);

    try {
      await createRequest({ ...request, repetitions: repetitions });

      onClose({}, "create");
    } catch {
      
    }
  }

  return (
    <Dialog maxWidth="md" fullWidth open={open} onClose={onClose}>
      <DialogTitle>Nový požadavek</DialogTitle>
      <DialogContent>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <RequestForm onSubmit={submitRequest} />
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Opakování</Typography>
            </Grid>

            <Grid item xs={12}>
              <RepetitionForm onSubmit={addRepetition} />
            </Grid>

            <Grid item xs={12}>
              <RepetitionTable repetitions={repetitions} onDelete={deleteRepetition} />
            </Grid>
          </Grid>
        </Grid>

      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose({}, "cancel")} color="primary">
          Zavřít
        </Button>
        <Button type="submit" form="request-form" color="primary">
          Vytvořit
        </Button>
      </DialogActions>
    </Dialog>
  );
}