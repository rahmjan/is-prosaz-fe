import React, {useEffect, useState} from "react";
import {getCaretakerById, CaretakerDto} from "../../api/caretakers";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableHead, TableRow, Typography
} from "@material-ui/core";


type CaretakerDetailProps = {
    open: boolean,
    onClose(event: object, reason: string): void,
    caretakerId: number | null
}

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
            <DialogTitle>Detail pečovatele</DialogTitle>

            <DialogContent>
                <Typography variant="subtitle1" noWrap>{caretaker.name} {caretaker.surname}</Typography>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Údaje</TableCell>
                                <TableCell>Kontakt</TableCell>
                                <TableCell>Zaměstnání</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Datum narození: {caretaker.dateOfBirth}</TableCell>
                                <TableCell>Email: {caretaker.email}</TableCell>
                                <TableCell>Datum nástupu: {caretaker.dateOfAdmission}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Pohlaví: {caretaker.gender}</TableCell>
                                <TableCell>Telefon: {caretaker.phoneNumber}</TableCell>
                                <TableCell>Úvazek: {caretaker.employmentType}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Vzdělání: {caretaker.education}</TableCell>
                                <TableCell>Nouzový kontakt: {caretaker.emergencyContact}</TableCell>
                                <TableCell>Úvazek: {caretaker.employmentType}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
        </Dialog>
    );
}