import React, { useEffect, useState } from "react";
import { Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import { AppHeader } from "../menu/AppHeader";
import { CaretakerShortDto, getCaretakers } from "../../api/caretakers";
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {CaretakerDetail} from "../dialogs/CaretakerDetail";

export function Caretakers() {
    const [caretakers, setCaretakers] = useState<CaretakerShortDto[]>([]);
    const [caretakerDetailId, setCaretakerDetailId] = useState<number | null>(null);

    const onCloseDetail = (event: object, reason: string) => {
        setCaretakerDetailId(null);
    }

    useEffect(() => {
        getCaretakers().then(res => {
            setCaretakers(res);
        })
            .catch(error => {
                console.error("Error in loading of caretakers...");
            })
    }, []);

    return (
        <>
            <AppHeader/>
            <Container>
                <Typography variant="h4" noWrap>Pečovatelé</Typography>
                <TextField variant="outlined" label="Hledat podle příjmení..."/>

                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Příjmení</TableCell>
                                <TableCell>Jméno</TableCell>
                                <TableCell>Adresa</TableCell>
                                <TableCell>Kontakt</TableCell>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {caretakers.map((c, index) =>
                                <TableRow key={index}>
                                    <TableCell>{c.surname}</TableCell>
                                    <TableCell>{c.name}</TableCell>
                                    <TableCell>{
                                        c.address.streetName + " " +
                                        c.address.orientationNumber + ", " +
                                        c.address.town
                                    }</TableCell>
                                    <TableCell>{c.phoneNumber}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick = {() => setCaretakerDetailId(c.id)} >
                                            <MoreHorizIcon/>
                                        </IconButton>
                                        <IconButton>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <CaretakerDetail open={caretakerDetailId !== null} onClose={onCloseDetail} caretakerId={caretakerDetailId}  />
            </Container>
        </>
    )
}