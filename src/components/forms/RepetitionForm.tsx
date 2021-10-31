import { Checkbox, FormControlLabel, Grid, IconButton, makeStyles, MenuItem, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { Controller, ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import { CreateRepetitionDto, DayOfWeek } from "../../api/requests";

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

const dayToString = (day: string) => {
  switch (day) {
    case "MONDAY": return "Pondělí"
    case "TUESDAY": return "Úterý"
    case "WEDNESDAY": return "Středa"
    case "THURSDAY": return "Čtvrtek"
    case "FRIDAY": return "Pátek"
    case "SATURDAY": return "Sobota"
    case "SUNDAY": return "Neděle"
  }
}

interface IFormInput {
  dayOfWeek: DayOfWeek,
  firstDate: string,
  start: ITime,
  finish: ITime,
  influencedByHoliday: boolean,
  weeksRepetition: string
}

interface ITime {
  hours: string;
  minutes: string;
}

const mapToRepetitionDto = (input: IFormInput): CreateRepetitionDto => {
  return {
    dayOfWeek: input.dayOfWeek,
    firstDate: new Date(input.firstDate),
    influencedByHoliday: !!input.influencedByHoliday,
    weeksRepetition: Number(input.weeksRepetition),
    start: `${input.start.hours}:${input.start.minutes}:00`,
    finish: `${input.finish.hours}:${input.finish.minutes}:00`
  }
}

export function RepetitionForm({ onSubmit }: { onSubmit(createRepetitionDto: CreateRepetitionDto): void }) {
  const { control, handleSubmit } = useForm<IFormInput>();

  const onSubmitForm: SubmitHandler<IFormInput> = data => {
    const dto = mapToRepetitionDto(data);

    console.log("form data", data);
    console.log("DTO", dto);

    onSubmit(dto);
  };

  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Controller
            name="dayOfWeek"
            defaultValue=""
            control={control}
            render={({ field }) => <DayOfWeekSelect field={field} />}
          />
        </Grid>

        <Grid item xs={2}>
          <Controller
            name="firstDate"
            defaultValue=""
            control={control}
            render={({ field }) => <TextField
              label="První událost"
              type="date"
              defaultValue={dateString(new Date())}
              className={classes.textField}
              InputLabelProps={{ shrink: true }}
              {...field}
            />}
          />
        </Grid>

        <Grid item container xs={1} spacing={1}>
          <Grid item xs>
            <Controller
              name="start.hours"
              defaultValue=""
              control={control}
              render={({ field }) => <TextField label="hh" placeholder="hh" fullWidth {...field} />}
            />
          </Grid>
          <Grid item xs>
            <Controller
              name="start.minutes"
              defaultValue=""
              control={control}
              render={({ field }) => <TextField label="mm" placeholder="mm" fullWidth {...field} />}
            />
          </Grid>
        </Grid>

        <Grid item container xs={1} spacing={1}>
          <Grid item xs>
            <Controller
              name="finish.hours"
              defaultValue=""
              control={control}
              render={({ field }) => <TextField label="hh" placeholder="hh" fullWidth {...field} />}
            />
          </Grid>
          <Grid item xs>
            <Controller
              name="finish.minutes"
              defaultValue=""
              control={control}
              render={({ field }) => <TextField label="mm" placeholder="mm" fullWidth {...field} />}
            />
          </Grid>
        </Grid>

        <Grid item xs={2}>
          <Controller
            name="weeksRepetition"
            defaultValue=""
            control={control}
            render={({ field }) => <TextField type="number" label="Týdenní opakování" fullWidth {...field} />}
          />
        </Grid>

        <Grid item xs={2}>
          <Controller
            name="influencedByHoliday"
            defaultValue={false}
            control={control}
            render={({ field }) => <FormControlLabel control={<Switch />} label="Ve svátek" {...field} />}
          />

        </Grid>

        <Grid item xs={1}>
          <IconButton type="submit" color="primary" aria-label="add">
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    </form>
  );
}

export function RepetitionTable({ repetitions, onDelete }: { repetitions: CreateRepetitionDto[], onDelete(repetition: CreateRepetitionDto): void }) {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Den v týdnu</TableCell>
            <TableCell>Začátek</TableCell>
            <TableCell>Konec</TableCell>
            <TableCell>První událost</TableCell>
            <TableCell>Týdenní opakování</TableCell>
            <TableCell>Ve svátek</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {repetitions.map((r, index) =>
            <TableRow key={index}>
              <TableCell>{dayToString(r.dayOfWeek)}</TableCell>
              <TableCell>{r.start}</TableCell>
              <TableCell>{r.finish}</TableCell>
              <TableCell>{dateString(r.firstDate)}</TableCell>
              <TableCell>{r.weeksRepetition}</TableCell>
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

function DayOfWeekSelect({ field }: { field: ControllerRenderProps }) {
  return (
    <TextField label="Den v týdnu" select fullWidth {...field}>
      <MenuItem value="MONDAY">Pondělí</MenuItem>
      <MenuItem value="TUESDAY">Úterý</MenuItem>
      <MenuItem value="WEDNESDAY">Středa</MenuItem>
      <MenuItem value="THURSDAY">Čtvrtek</MenuItem>
      <MenuItem value="FRIDAY">Pátek</MenuItem>
      <MenuItem value="SATURDAY">Sobota</MenuItem>
      <MenuItem value="SUNDAY">Neděle</MenuItem>
    </TextField>
  )
}