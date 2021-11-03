import { Box, Button, Checkbox, FormControlLabel, Grid, IconButton, MenuItem, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Controller, ControllerRenderProps, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { CreateRepetitionDto, DayOfWeek } from "../../api/requests";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, DateTimePicker } from "./DateTimePickers";
import { FormDateFormat, FormDateTimeFormat } from "../../utils/constants";
import { format } from 'date-fns';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

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
  firstDate: Date | null,
  start: Date | null,
  finish: Date | null,
  influencedByHoliday: boolean,
  weeksRepetition: number
}

const mapToRepetitionDto = (input: IFormInput): CreateRepetitionDto => {
  return {
    dayOfWeek: input.dayOfWeek || undefined,
    // firstDate: input.firstDate || undefined,
    influencedByHoliday: !input.influencedByHoliday, // WARNING: this is inversed in API compared to the frontend
    weeksRepetition: Number(input.weeksRepetition),
    start: input.start || undefined,
    finish: input.finish || undefined
  }
}

const Repetition = z.object({
  dayOfWeek: z.nativeEnum(DayOfWeek),
  // firstDate: z.date().nullable(),
  start: z.date().nullable(),
  finish: z.date().nullable(),
  influencedByHoliday: z.boolean(),
  weeksRepetition: z.number().int().or(z.string())
})

export function RepetitionForm({ onSubmit }: { onSubmit(createRepetitionDto: CreateRepetitionDto): void }) {
  const { control, handleSubmit } = useForm<IFormInput>({
    resolver: zodResolver(Repetition),
    defaultValues: { start: null, finish: null, firstDate: null }
  });

  const onSubmitError: SubmitErrorHandler<IFormInput> = (errors) => console.log("form errors", errors)
  const onSubmitForm: SubmitHandler<IFormInput> = data => {
    const dto = mapToRepetitionDto(data);
    onSubmit(dto);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm, onSubmitError)}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Controller
              name="dayOfWeek"
              defaultValue=""
              control={control}
              render={({ field }) => <DayOfWeekSelect field={field} />}
            />
          </Grid>

          <Grid item xs={4}>
            <Controller
              name="weeksRepetition"
              defaultValue={1}
              control={control}
              render={({ field }) => <TextField type="number" label="Četnost" fullWidth {...field} />}
            />
          </Grid>

          <Grid item xs={4} container>
            <Grid container justifyContent="center">
              <Controller
                name="influencedByHoliday"
                defaultValue={false}
                control={control}
                render={({ field }) => <FormControlLabel control={<Switch />} label="Včetně svátku" {...field} />}
              />
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <Controller
              name="start"
              control={control}
              render={({ field }) => (
                <DatePicker fullWidth field={field} label="Začátek" format={FormDateFormat} ampm={false} variant="inline" />
              )}
            />
          </Grid>

          <Grid item xs={4}>
            <Controller
              name="finish"
              control={control}
              render={({ field }) => (
                <DatePicker fullWidth field={field} label="Konec" format={FormDateFormat} ampm={false} variant="inline" />
              )}
            />
          </Grid>

          {/* <Grid item xs={3}>
            <Controller
              name="firstDate"
              control={control}
              render={({ field }) => (
                <DatePicker fullWidth field={field} label="První událost" format={FormDateFormat} ampm={false} variant="inline" />
              )}
            />
          </Grid> */}

          <Grid item xs={4}>
            {/* <IconButton type="submit" color="primary" aria-label="add">
              <AddIcon />
            </IconButton> */}

            <Box textAlign="right"><Button type="submit" variant="contained" color="primary">Přidat opakování</Button></Box>
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
            {/* <TableCell>Týdenní opakování</TableCell> */}
            <TableCell>Ve svátek</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {repetitions.map((r, index) =>
            <TableRow key={index}>
              <TableCell>{dayToString(r.dayOfWeek)}</TableCell>
              <TableCell>{r.start ? format(r.start, FormDateFormat) : "Nezadáno"}</TableCell>
              <TableCell>{r.finish ? format(r.finish, FormDateFormat) : "Nezadáno"}</TableCell>
              {/* <TableCell>{r.firstDate ? format(r.firstDate, FormDateFormat) : "Nezadáno"}</TableCell> */}
              <TableCell>{r.weeksRepetition}</TableCell>
              <TableCell><Checkbox checked={!r.influencedByHoliday} /></TableCell>
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
