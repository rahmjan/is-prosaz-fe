import React, {useEffect, useState} from "react";
import {getCaretakerById, CaretakerDto, CaretakerDetailProps} from "../../api/caretakers";
import {
    Dialog,
    DialogContent,
    DialogTitle, Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableHead, TableRow, TextField, Typography
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import {Controller} from "react-hook-form";

export function CaretakerDetail({ open, onClose, caretakerId }: CaretakerDetailProps  ) {

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
            <DialogTitle>Detail pečovatele: {caretaker.name} {caretaker.surname}</DialogTitle>

            <DialogContent>

                <Grid container direction="row" spacing={4} >
                    <Grid item xs={6}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>Osobní údaje</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>{caretaker.id}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Titul</TableCell>
                                    <TableCell>{caretaker.title}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Jméno</TableCell>
                                    <TableCell>{caretaker.name} {caretaker.surname}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Pohlaví</TableCell>
                                    <TableCell>{caretaker.gender}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Datum narození</TableCell>
                                    <TableCell>{caretaker.dateOfBirth}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>

                    <Grid item xs={6}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>Adresa</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Ulice</TableCell>
                                    <TableCell>{caretaker.address.streetName}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Číslo popisné</TableCell>
                                    <TableCell>{caretaker.address.orientationNumber}/{caretaker.address.descriptiveNum}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Město</TableCell>
                                    <TableCell>{caretaker.address.town}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>PSČ</TableCell>
                                    <TableCell>{caretaker.address.postalCode}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>

                    <Grid item xs={6}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>Kontakt</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Telefon</TableCell>
                                    <TableCell>{caretaker.phoneNumber}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>E-mail</TableCell>
                                    <TableCell>{caretaker.email}/{caretaker.address.descriptiveNum}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Nouzový kontakt</TableCell>
                                    <TableCell>{caretaker.emergencyContact}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>

                    <Grid item xs={6}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>Zaměstnání</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Datum přijetí</TableCell>
                                    <TableCell>{caretaker.dateOfAdmission}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Úvazek</TableCell>
                                    <TableCell>{caretaker.employmentType}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Území</TableCell>
                                    <TableCell>{caretaker.territory}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Nadřízený</TableCell>
                                    <TableCell>{caretaker.superior}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>

                </Grid>
            </DialogContent>
        </Dialog>
    );
}