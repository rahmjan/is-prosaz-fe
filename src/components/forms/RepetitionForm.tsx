import { Checkbox, FormControlLabel, Grid, IconButton, makeStyles, MenuItem, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { KeyboardDatePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Controller, ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import { CreateRepetitionDto, DayOfWeek } from "../../api/requests";
import DateFnsUtils from '@date-io/date-fns';
import { useEffect } from "react";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

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
  firstDate?: Date | null,
  start?: Date | null,
  finish?: Date | null,
  influencedByHoliday: boolean,
  weeksRepetition: number
}

const mapToRepetitionDto = (input: IFormInput): CreateRepetitionDto => {
  return {
    dayOfWeek: input.dayOfWeek,
    firstDate: input.firstDate,
    influencedByHoliday: !!input.influencedByHoliday,
    weeksRepetition: input.weeksRepetition,
    start: "",
    finish: ""
    // start: input.start ? `${input.start.hours()}:${input.start.minutes()}:00` : "",
    // finish: input.finish ? `${input.finish.hours()}:${input.finish.minutes()}:00` : ""
  }
}

export function RepetitionForm({ onSubmit }: { onSubmit(createRepetitionDto: CreateRepetitionDto): void }) {
  const { control, handleSubmit, register, getValues, setValue } = useForm<IFormInput>();

  const onSubmitForm: SubmitHandler<IFormInput> = data => {
    const dto = mapToRepetitionDto(data);

    console.log("form data", data);
    console.log("DTO", dto);

    onSubmit(dto);
  };

  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Controller
              name="dayOfWeek"
              defaultValue=""
              control={control}
              render={({ field }) => <DayOfWeekSelect field={field} />}
            />
          </Grid>

          <Grid item xs={2}>
            <Controller
              name="start"
              control={control}
              render={({ field }) => (
                <DateTimePicker field={field} label="Začátek" format="dd.MM.yyyy HH:mm" variant="inline" />
              )}
            />
          </Grid>

          <Grid item xs={2}>
            <Controller
              name="start"
              control={control}
              render={({ field }) => (
                <DateTimePicker field={field} label="Začátek" format="dd.MM.yyyy HH:mm" variant="inline" />
              )}
            />
          </Grid>

          <Grid item xs={2}>
            <Controller
              name="finish"
              control={control}
              render={({ field }) => (
                <DateTimePicker field={field} label="Konec" format="dd.MM.yyyy HH:mm" variant="inline" />
              )}
            />
          </Grid>

          <Grid item xs={2}>
            <Controller
              name="weeksRepetition"
              defaultValue={1}
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
      </MuiPickersUtilsProvider>
    </form >
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

function DateTimePicker({ field: { value, onChange }, ...otherProps }: { field: ControllerRenderProps, [x: string]: any }) {
  return (
    <KeyboardDateTimePicker
      onChange={onChange}
      value={value}
      {...otherProps}
    />
  )
}

function DatePicker({ field: { value, onChange }, ...otherProps }: { field: ControllerRenderProps, [x: string]: any }) {
  return (
    <KeyboardDatePicker
      onChange={onChange}
      value={value}
      {...otherProps}
    />
  )
}