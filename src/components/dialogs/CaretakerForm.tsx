import {Button, Dialog, DialogContent, DialogTitle, Grid, MenuItem, TextField, Typography} from "@material-ui/core";
import { Control, Controller, ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import {CaretakerDetailProps, CaretakerDto, CreateCaretakerDto, getCaretakerById} from "../../api/caretakers";
import React, {useEffect, useState} from "react";

const mapToRequestDto = (input: CaretakerDto): Partial<CreateCaretakerDto> => {
    return {
        address: {descriptiveNum: "", id: 0, orientationNumber: "", postalCode: "", streetName: "", town: ""},
        dateOfAdmission: "",
        dateOfBirth: "",
        email: "",
        emergencyContact: "",
        employmentType: "",
        gender: "",
        id: 0,
        name: "",
        phoneNumber: "",
        superior: 0,
        surname: input.surname,
        territory: "",
        title: "",
        education: "",
    }
}

export function CaretakerForm({ open, onClose, caretakerId }: CaretakerDetailProps  ) {
    const { control, handleSubmit } = useForm();
    const [caretaker, setCaretaker] = useState<CaretakerDto>( {
        address: {
            descriptiveNum: "string",
            id: 0,
            orientationNumber: "string",
            postalCode: "string",
            streetName: "string",
            town: "string"
        },
        dateOfAdmission: "2021-10-29",
        dateOfBirth: "2021-10-29",
        education: "BASIC",
        email: "string",
        emergencyContact: "string",
        employmentType: "PLNY",
        gender: "MALE",
        id: 0,
        name: "string",
        phoneNumber: "string",
        superior: 0,
        surname: "string",
        territory: "LEVY",
        title: "string"
    } )
    const onSubmit: SubmitHandler<CaretakerDto> = data => {
        console.log("form data", data);
        console.log("DTO", mapToRequestDto(data));
    };

    useEffect(() => {
        if (caretakerId !== null) {
            getCaretakerById(caretakerId).then(res => {
                setCaretaker(res);
            })
                .catch(error => {
                    console.error("Error in loading of caretaker...");
                })
        }
    }, [caretakerId]);

    return (
        <Dialog fullWidth maxWidth="lg" open={open} onClose={onClose}>
            <DialogTitle>Úprava pečovatele: {caretaker.name} {caretaker.surname}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container direction="row" spacing={4} >

                        <Grid item xs={2}>
                            <Controller
                                name="phoneNumber"
                                defaultValue=""
                                control={control}
                                render={({ field }) => <TextField placeholder={caretaker.phoneNumber} label="Telefon" fullWidth {...field} />}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <Controller
                                name="email"
                                defaultValue=""
                                control={control}
                                render={({ field }) => <TextField label="E-mail" fullWidth {...field} />}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <Controller
                                name="education"
                                defaultValue=""
                                control={control}
                                render={({ field }) => <TextField label="Vzdělání" fullWidth {...field} />}
                            />
                        </Grid>

                        <Grid item xs={6}>
                        </Grid>

                        <Grid item>
                            <Typography variant="overline">Adresa</Typography>
                            <Grid container spacing={1}>
                                <Grid item xs={8}>
                                    <Controller
                                        name="address.streetName"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => <TextField label="Ulice" fullWidth {...field} />}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Controller
                                        name="address.descriptiveNumber"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => <TextField label="č. p." fullWidth {...field} />}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Controller
                                        name="address.orientationNumber"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => <TextField label="č. o." fullWidth {...field} />}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid item xs={8}>
                                    <Controller
                                        name="address.town"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => <TextField label="Město" fullWidth {...field} />}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Controller
                                        name="address.postalCode"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => <TextField label="PSČ" fullWidth {...field} />}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Typography variant="overline">Kontakt</Typography>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <Controller
                                        name="phoneNumber"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => <TextField label="Telefon" fullWidth {...field} />}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        name="email"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => <TextField label="E-mail" fullWidth {...field} />}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        name="emergencyContact"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => <TextField label="Nouzový kontakt" fullWidth {...field} />}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <input type="submit" />
                        </Grid>
                    </Grid >
                </form >
            </DialogContent>
        </Dialog>
    );
}