import { Button, Grid, MenuItem, TextField, Typography } from "@material-ui/core";
import { RepetitionForm } from "./RepetitionForm";


export function RequestForm() {
  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <TextField label="Klient" id="client" fullWidth />
      </Grid>

      <Grid item>
        <TextField label="Aktivita" id="activity" fullWidth />
      </Grid>

      <Grid item>
        <TextField label="Poznámka" id="note" fullWidth />
      </Grid>

      <Grid item>
        <Typography variant="overline">Doba trvání</Typography>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField label="Hodiny" id="duration-hours" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Minuty" id="duration-minutes" fullWidth />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Typography variant="overline">Nejdřívější čas začátku</Typography>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField label="Hodiny" id="duration-hours" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Minuty" id="duration-minutes" fullWidth />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Typography variant="overline">Nejpozdější čas konce</Typography>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField label="Hodiny" id="duration-hours" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Minuty" id="duration-minutes" fullWidth />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField label="Počet pečovatelů" id="caretaker-count" type="number" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Preferované pohlaví" select id="gender" fullWidth>
              <MenuItem value="MALE">Muž</MenuItem>
              <MenuItem value="FEMALE">Žena</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Typography variant="overline">Místo začátku</Typography>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <TextField label="Ulice" id="start-street" fullWidth />
          </Grid>
          <Grid item xs={2}>
            <TextField label="č. p." id="start-descriptive-number" fullWidth />
          </Grid>
          <Grid item xs={2}>
            <TextField label="č. o." id="start-orientation-number" fullWidth />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <TextField label="Město" id="start-city" fullWidth />
          </Grid>
          <Grid item xs={4}>
            <TextField label="PSČ" id="start-postal-code" fullWidth />
          </Grid>
        </Grid>
      </Grid>

      <Typography variant="overline">Opakování</Typography>
      <Grid item>
        <RepetitionForm />
      </Grid>

      <Grid item>
        <Button color="primary" variant="contained">Vytvořit</Button>
      </Grid>
    </Grid>
  );
}