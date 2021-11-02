import React, {useEffect, useState} from "react";
import {
    CaretakerDetailProps,
    CaretakerDto,
    getCaretakerById,
    getWorkHours, updateCaretaker,
    WorkHoursDto
} from "../../api/caretakers";
import {Button, Dialog, DialogContent, DialogTitle, Grid, MenuItem, TextField, Typography} from "@material-ui/core";
import {Controller} from "react-hook-form";


export function CaretakerEdit({ open, onClose, caretakerId }: CaretakerDetailProps  ) {

    const [caretaker, setCaretaker] = useState<CaretakerDto>( initCaretaker )
    const [workHours, setWorkHours] = useState<WorkHoursDto>( )

    function handleSave() {
        updateCaretaker(caretaker);
    }

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

    useEffect(() => {
        if (caretakerId !== null) {
            getWorkHours(caretakerId).then(res => {
                setWorkHours(res);
            })
                .catch(error => {
                    console.error("Error in loading of work hours...");
                })
        }
    }, [caretakerId]);

    return (
        <Dialog fullWidth maxWidth="lg" open={open} onClose={onClose}>
            <DialogTitle>Úprava pečovatele: {caretaker.name} {caretaker.surname}</DialogTitle>

            <DialogContent>
                <Grid container direction="row" spacing={4} >
                    <Grid item>
                        <Typography variant="subtitle1">Osobní údaje</Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={2}>
                                <Typography variant="subtitle2">Titul</Typography>
                                <TextField
                                    required
                                    variant="standard"
                                    value={caretaker.title}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <Typography variant="subtitle2">Příjmení</Typography>
                                <TextField
                                    required
                                    fullWidth
                                    variant="standard"
                                    value={caretaker.name}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <Typography variant="subtitle2">Jméno</Typography>
                                <TextField
                                    required
                                    fullWidth
                                    variant="standard"
                                    value={caretaker.surname}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={2}>
                                <Typography variant="subtitle2">Pohlaví</Typography>
                                <TextField
                                    required
                                    select
                                    fullWidth
                                    variant="standard"
                                    value={caretaker.gender}
                                >
                                    <MenuItem value="MALE">Muž</MenuItem>
                                    <MenuItem value="FEMALE">Žena</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="subtitle2">Datum narození</Typography>
                                <TextField
                                    required
                                    variant="standard"
                                    value={caretaker.dateOfBirth}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Typography variant="subtitle1">Adresa</Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={8}>
                                <Typography variant="subtitle2">Ulice</Typography>
                                <TextField
                                    required
                                    fullWidth
                                    variant="standard"
                                    value={caretaker.address.streetName}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="subtitle2">č. p.</Typography>
                                <TextField
                                    required
                                    variant="standard"
                                    value={caretaker.address.descriptiveNum}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="subtitle2">č. o.</Typography>
                                <TextField
                                    required
                                    variant="standard"
                                    value={caretaker.address.orientationNumber}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={8}>
                                <Typography variant="subtitle2">Město</Typography>
                                <TextField
                                    required
                                    fullWidth
                                    variant="standard"
                                    value={caretaker.address.town}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="subtitle2">PSČ</Typography>
                                <TextField
                                    required
                                    variant="standard"
                                    value={caretaker.address.postalCode}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Typography variant="subtitle1">Kontakt</Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <Typography variant="subtitle2">Telefon</Typography>
                                <TextField
                                    required
                                    variant="standard"
                                    value={caretaker.phoneNumber}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="subtitle2">E-mail</Typography>
                                <TextField
                                    required
                                    variant="standard"
                                    value={caretaker.email}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="subtitle2">Nouzový kontakt</Typography>
                                <TextField
                                    required
                                    variant="standard"
                                    value={caretaker.emergencyContact}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="subtitle1">Zaměstnání</Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <Typography variant="subtitle2">Úvazek</Typography>
                                <TextField
                                    required
                                    select
                                    fullWidth
                                    variant="standard"
                                    value={caretaker.employmentType}
                                >
                                    <MenuItem value="PLNY">Plný</MenuItem>
                                    <MenuItem value="POLOVICNI">Poloviční</MenuItem>
                                    <MenuItem value="TRICTYRI">Tři/čtyři</MenuItem>
                                    <MenuItem value="JEDNACTYRI">Jedna/čtyři</MenuItem>
                                    <MenuItem value="DPP">DPP</MenuItem>
                                    <MenuItem value="DPC">DPC</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="subtitle2">Vzdělání</Typography>
                                <TextField
                                    required
                                    select
                                    fullWidth
                                    variant="standard"
                                    value={caretaker.education}
                                >
                                    <MenuItem value="BASIC">Základní škola</MenuItem>
                                    <MenuItem value="MIDDLE_SCHOOL">Střední škola</MenuItem>
                                    <MenuItem value="HIGH_SCHOOL">Gymnázium</MenuItem>
                                    <MenuItem value="UNIVERSITY">Vysoká škola</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="subtitle2">Území</Typography>
                                <TextField
                                    required
                                    select
                                    fullWidth
                                    variant="standard"
                                    value={caretaker.territory}
                                >
                                    <MenuItem value="LEVY">Levý</MenuItem>
                                    <MenuItem value="PRAVY">Pravý</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Button color="primary" variant="contained" onClick={handleSave}>Uložit změny</Button>
                    </Grid>
                </Grid >

                <Grid container direction="row" spacing={4} >
                    <Grid item xs={12}>
                        <Typography variant="h6">Pracovní doba</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">Začátek pracovní doby</Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <Typography variant="subtitle2">Hodina</Typography>
                                <TextField
                                    required
                                    variant="standard"
                                    value={workHours?.start.hour}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="subtitle2">Minuta</Typography>
                                <TextField
                                    required
                                    fullWidth
                                    variant="standard"
                                    value={workHours?.start.minute}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="subtitle1">Konec pracovní doby</Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <Typography variant="subtitle2">Hodina</Typography>
                                <TextField
                                    required
                                    variant="standard"
                                    value={workHours?.finish.hour}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="subtitle2">Minuta</Typography>
                                <TextField
                                    required
                                    fullWidth
                                    variant="standard"
                                    defaultValue={workHours?.finish.minute}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Button color="primary" variant="contained" onClick={handleSave}>Uložit změny</Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}

const initCaretaker = {
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
}

const initWorkHours = {
    employee: 0,
    finish: {
        hour: "string",
        minute: "string",
        nano: 0,
        second: "string"
    },
    id: 0,
    maxTime: {
        hour: "string",
        minute: "string",
        nano: 0,
        second: "string"
    },
    shiftType: "string",
    start: {
        hour: "string",
        minute: "string",
        nano: 0,
        second: "string"
    },
    territory: "string",
    workHours: [
        {
            dayOfWeek: "string",
            finish: "string",
            firstDate: "string",
            id: 0,
            influencedByHoliday: false,
            start: "string",
            weeksRepetition: 0
        }
    ]
}