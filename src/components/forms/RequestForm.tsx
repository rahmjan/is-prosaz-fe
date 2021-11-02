import { Grid, MenuItem, TextField, Typography } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Controller, ControllerRenderProps, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { CreateRequestDto } from "../../api/requests";
import DateFnsUtils from '@date-io/date-fns';
import { TimePicker } from "./DateTimePickers";
import { format } from 'date-fns';
import { ClientOption, ClientPicker } from "./ClientPicker";
import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { zeroPad } from "../../utils/formating";

// TODO replace this with zod schema
interface IFormInput {
  client: number | null;
  activity: string;
  note: string;
  duration: ITime;
  startTime: Date | null;
  endTime: Date | null;
  caretakerCount: number | null;
  preferredGender: string;
  startAddress: IAddress;
  territory: string;
}

interface IAddress {
  streetName: string;
  descriptiveNumber: string;
  orientationNumber: string;
  town: string;
  postalCode: string;
}

interface ITime {
  hours: number;
  minutes: number;
}

const Time = z.object({
  hours: z.number().int().nonnegative().max(24).or(z.string()), // TODO: fix strings
  minutes: z.number().int().nonnegative().max(59).or(z.string())
});

const Address = z.object({
  streetName: z.string(),
  descriptiveNumber: z.string(),
  orientationNumber: z.string(),
  town: z.string(),
  postalCode: z.string()
});

const Request = z.object({
  client: z.number().int(),
  activity: z.string().min(1),
  note: z.string(),
  duration: Time,
  startTime: z.date().nullable(),
  endTime: z.date().nullable(),
  caretakerCount: z.number().int().nullish().or(z.string()),
  preferredGender: z.enum(["", "MALE", "FEMALE"]).nullable(),
  startAddress: Address,
  territory: z.enum(["LEVY", "PRAVY"])
});

const mapToRequestDto = (input: IFormInput): CreateRequestDto => {
  return {
    client: Number(input.client),
    activity: input.activity,
    note: input.note,
    duration: `${zeroPad(input.duration.hours, 2)}:${zeroPad(input.duration.minutes, 2)}:00`,
    earliestStart: input.startTime ? format(input.startTime, "HH:mm:00") : undefined,
    latestEnd: input.endTime ? format(input.endTime, "HH:mm:00") : undefined,
    territory: input.territory,
    numberOfCaretakers: input.caretakerCount ? Number(input.caretakerCount) : undefined,
    requiredGender: input.preferredGender || undefined
  }
}

export function RequestForm({ onSubmit }: { onSubmit(createRequestDto: CreateRequestDto): void }) {
  const { control, handleSubmit, register, setValue } = useForm<IFormInput>({
    resolver: zodResolver(Request),
    defaultValues: {
      client: null,
      startTime: null,
      endTime: null,
      preferredGender: "",
    }
  });

  const onSubmitError: SubmitErrorHandler<IFormInput> = (errors) => console.log("form errors", errors)
  const onSubmitForm: SubmitHandler<IFormInput> = data => {
    const dto = mapToRequestDto(data);
    onSubmit(dto);
  };

  const handleClientChange = (event: object, value: ClientOption | null, reason: string) => setValue("client", value?.id || null, { shouldValidate: true, shouldDirty: true })

  useEffect(() => {
    register("client", { required: true });
  });

  return (
    <Grid container direction="column" spacing={1}>
      <form onSubmit={handleSubmit(onSubmitForm, onSubmitError)} id="request-form">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid item>
            <ClientPicker label="Klient" onChange={handleClientChange} fullWidth />

          </Grid>

          <Grid item>
            <Controller
              name="activity"
              defaultValue=""
              control={control}
              render={({ field }) => <TextField label="Aktivita" fullWidth {...field} />}
            />
          </Grid>

          <Grid item>
            <Controller
              name="note"
              defaultValue=""
              control={control}
              render={({ field }) => <TextField label="Poznámka" fullWidth {...field} />}
            />
          </Grid>

          <Grid item>
            <Typography variant="overline">Doba trvání</Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Controller
                  name="duration.hours"
                  defaultValue={0}
                  control={control}
                  render={({ field }) => <TextField label="Hodiny" type="number" fullWidth {...field} />}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="duration.minutes"
                  defaultValue={0}
                  control={control}
                  render={({ field }) => <TextField label="Minuty" type="number" fullWidth {...field} />}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item container>
            <Grid item xs={6}>
              <Controller
                name="startTime"
                control={control}
                render={({ field }) => (
                  <TimePicker ampm={false} field={field} label="Nejdřívější čas začátku" format="HH:mm" variant="inline" />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="endTime"
                control={control}
                render={({ field }) => (
                  <TimePicker ampm={false} field={field} label="Nejpozdější čas konce" format="HH:mm" variant="inline" />
                )}
              />
            </Grid>
          </Grid>

          <Grid item>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Controller
                  name="caretakerCount"
                  control={control}
                  render={({ field }) => <TextField label="Počet pečovatelů" type="number" fullWidth {...field} />}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="preferredGender"
                  control={control}
                  render={({ field }) => <GenderSelect field={field} />}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Typography variant="overline">Místo začátku</Typography>
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <Controller
                  name="startAddress.streetName"
                  defaultValue=""
                  control={control}
                  render={({ field }) => <TextField label="Ulice" fullWidth {...field} />}
                />
              </Grid>
              <Grid item xs={2}>
                <Controller
                  name="startAddress.descriptiveNumber"
                  defaultValue=""
                  control={control}
                  render={({ field }) => <TextField label="č. p." fullWidth {...field} />}
                />
              </Grid>
              <Grid item xs={2}>
                <Controller
                  name="startAddress.orientationNumber"
                  defaultValue=""
                  control={control}
                  render={({ field }) => <TextField label="č. o." fullWidth {...field} />}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <Controller
                  name="startAddress.town"
                  defaultValue=""
                  control={control}
                  render={({ field }) => <TextField label="Město" fullWidth {...field} />}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="startAddress.postalCode"
                  defaultValue=""
                  control={control}
                  render={({ field }) => <TextField label="PSČ" fullWidth {...field} />}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="territory"
              defaultValue=""
              control={control}
              render={({ field }) => <TerritorySelect field={field} />}
            />
          </Grid>

        </MuiPickersUtilsProvider>
      </form >


    </Grid >
  );
}

function GenderSelect({ field }: { field: ControllerRenderProps }) {
  return (
    <TextField label="Preferované pohlaví" select fullWidth {...field}>
      <MenuItem value="MALE">Muž</MenuItem>
      <MenuItem value="FEMALE">Žena</MenuItem>
    </TextField>
  );
}

function TerritorySelect({ field }: { field: ControllerRenderProps }) {
  return (
    <TextField label="Oblast" select fullWidth {...field}>
      <MenuItem value="LEVY">Levý břeh</MenuItem>
      <MenuItem value="PRAVY">Pravý břeh</MenuItem>
    </TextField>
  )
}