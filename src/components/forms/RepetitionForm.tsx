import { Checkbox, FormControlLabel, Grid, IconButton, makeStyles, MenuItem, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { useState } from "react";
import { RepetitionDto } from "../../api/tasks";

const useStyles = makeStyles((theme) => ({
  // container: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  // },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const dateString = (date: Date) => date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

export function RepetitionForm() {
  const [repetitions, setRepetitions] = useState<RepetitionDto[]>([])
  const classes = useStyles();

  const addRepetition = () => setRepetitions([...repetitions, {
    dayOfWeek: "MONDAY",
    finish: "12:00",
    start: "11:00",
    firstDate: new Date(),
    influencedByHoliday: true,
    weeksRepetition: 1
  }]);

  const deleteRepetition = (repetition: RepetitionDto) => setRepetitions(repetitions.filter(r => r !== repetition));

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <TextField id="weekday" label="Den v týdnu" select fullWidth>
            <MenuItem value="MONDAY">Pondělí</MenuItem>
            <MenuItem value="TUESDAY">Úterý</MenuItem>
            <MenuItem value="WEDNESDAY">Středa</MenuItem>
            <MenuItem value="THURSDAY">Čtvrtek</MenuItem>
            <MenuItem value="FRIDAY">Pátek</MenuItem>
            <MenuItem value="SATURDAY">Sobota</MenuItem>
            <MenuItem value="SUNDAY">Neděle</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={2}>
          <TextField
            id="first-date"
            label="První událost"
            type="date"
            defaultValue={dateString(new Date())}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={1}>
          <TextField id="start-hour" label="hh" placeholder="hh" fullWidth />
        </Grid>
        <Grid item xs={1}>
          <TextField id="start-minute" label="mm" placeholder="mm" fullWidth />
        </Grid>

        <Grid item xs={1}>
          <TextField id="end-hour" label="hh" placeholder="hh" fullWidth />
        </Grid>
        <Grid item xs={1}>
          <TextField id="end-minute" label="mm" placeholder="mm" fullWidth />
        </Grid>

        <Grid item xs={2}>
          <FormControlLabel control={<Switch />} label="Ve svátek" />
        </Grid>

        <Grid item xs={1}>
          <IconButton onClick={() => addRepetition()} color="primary" aria-label="add">
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>

      <RepetitionTable repetitions={repetitions} onDelete={deleteRepetition} />
    </>
  );
}

function RepetitionTable({ repetitions, onDelete }: { repetitions: RepetitionDto[], onDelete(repetition: RepetitionDto): void }) {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Den v týdnu</TableCell>
            <TableCell>Začátek</TableCell>
            <TableCell>Konec</TableCell>
            <TableCell>První událost</TableCell>
            <TableCell>Ve svátek</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {repetitions.map((r, index) =>
            <TableRow key={index}>
              <TableCell>{r.dayOfWeek}</TableCell>
              <TableCell>{r.start}</TableCell>
              <TableCell>{r.finish}</TableCell>
              <TableCell>{dateString(r.firstDate)}</TableCell>
              <TableCell><Checkbox checked={r.influencedByHoliday} /></TableCell>
              <TableCell align="right">
                <IconButton onClick={() => onDelete(r)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}