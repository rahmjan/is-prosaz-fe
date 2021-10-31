import { Grid, MenuItem, TextField, Typography } from "@material-ui/core";
import { Controller, ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import { CreateRequestDto } from "../../api/requests";

interface IFormInput {
  client: string;
  activity: string;
  note: string;
  duration: ITime;
  startTime: ITime;
  endTime: ITime;
  caretakerCount: string;
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
  hours: string;
  minutes: string;
}

const mapToRequestDto = (input: IFormInput): CreateRequestDto => {
  return {
    client: Number(input.client),
    activity: input.activity,
    note: input.note,
    duration: `${input.duration.hours}:${input.duration.minutes}:00`,
    earliestStart: `${input.startTime.hours}:${input.startTime.minutes}:00`,
    latestEnd: `${input.endTime.hours}:${input.endTime.minutes}:00`,
    territory: input.territory,
    numberOfCaretakers: Number(input.caretakerCount),
    requiredGender: input.preferredGender
  }
}

export function RequestForm() {
  const { control, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log("form data", data);
    console.log("DTO", mapToRequestDto(data));
  };

  return (
    <Grid container direction="column" spacing={1}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid item>
          <Controller
            name="client"
            defaultValue=""
            control={control}
            render={({ field }) => <TextField label="Klient" fullWidth {...field} />}
          />
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
                defaultValue=""
                control={control}
                render={({ field }) => <TextField label="Hodiny" type="number" fullWidth {...field} />}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="duration.minutes"
                defaultValue=""
                control={control}
                render={({ field }) => <TextField label="Minuty" type="number" fullWidth {...field} />}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Typography variant="overline">Nejdřívější čas začátku</Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Controller
                name="startTime.hours"
                defaultValue=""
                control={control}
                render={({ field }) => <TextField label="Hodiny" type="number" fullWidth {...field} />}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="startTime.minutes"
                defaultValue=""
                control={control}
                render={({ field }) => <TextField label="Minuty" type="number" fullWidth {...field} />}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Typography variant="overline">Nejpozdější čas konce</Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Controller
                name="endTime.hours"
                defaultValue=""
                control={control}
                render={({ field }) => <TextField label="Hodiny" type="number" fullWidth {...field} />}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="endTime.minutes"
                defaultValue=""
                control={control}
                render={({ field }) => <TextField label="Minuty" type="number" fullWidth {...field} />}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Controller
                name="caretakerCount"
                defaultValue=""
                control={control}
                render={({ field }) => <TextField label="Počet pečovatelů" type="number" fullWidth {...field} />}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="preferredGender"
                defaultValue=""
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

        <input type="submit" />
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
      <MenuItem value="LEFT">Levý břeh</MenuItem>
      <MenuItem value="RIGHT">Pravý břeh</MenuItem>
    </TextField>
  )
}