import React, { useEffect, useState } from "react";
import {
    Container,
    Dialog, Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@material-ui/core";
import { AppHeader } from "../menu/AppHeader";
import { CaretakerShortDto, getCaretakers } from "../../api/caretakers";
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {CaretakerDetail} from "../dialogs/CaretakerDetail";
import EditIcon from "@material-ui/icons/Edit";
import {CaretakerForm} from "../dialogs/CaretakerForm";
import {CaretakerEdit} from "../dialogs/CaretakerEdit";
import {useForm} from "react-hook-form";
import {Autocomplete} from "@material-ui/lab";

export function Caretakers() {

    const [caretakers, setCaretakers] = useState<CaretakerShortDto[]>([]);
    const [caretakerDetailId, setCaretakerDetailId] = useState<number | null>(null);
    const [caretakerEditId, setCaretakerEditId] = useState<number | null>(null);
    const [filteredCaretakers, setFilteredCaretakers] = useState<CaretakerShortDto[]>([]);

    const onCloseDetail = (event: object, reason: string) => {
        setCaretakerDetailId(null);
    }

    const onCloseEdit = (event: object, reason: string) => {
        setCaretakerEditId(null)
    }

    useEffect(() => {
        getCaretakers().then(res => {
            setCaretakers(res);
            setFilteredCaretakers(res)
        })
            .catch(error => {
                console.error("Error in loading of caretakers...");
            })
    }, []);

    const filterCaretakers = (value: any) => {
        if (value == null)
            setFilteredCaretakers(caretakers);
        else
        {
            const res = caretakers.filter( caretaker => caretaker.surname.includes(value) ||
                                                        caretaker.surname.match(/value/i))
            setFilteredCaretakers(res);
        }
    }

    return (
        <>
            <AppHeader/>
            <Container>
                <Typography variant="h4" noWrap>Pečovatelé</Typography>

                <Grid item xs={3}>
                    <Autocomplete
                        disablePortal
                        freeSolo
                        options={caretakers.map((c) => c.surname)}
                        renderInput={(params) =>
                            <TextField {...params}
                                       label="Hledat podle příjmení..."
                                       variant="filled"
                            />
                        }
                        onChange={(event, value) => filterCaretakers(value)}
                    />
                </Grid>

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
                            {filteredCaretakers.map((c, index) =>
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
                                        <IconButton onClick={() => setCaretakerEditId(c.id)} >
                                            <EditIcon/>
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
                <CaretakerEdit open={caretakerEditId !== null} onClose={onCloseEdit} caretakerId={caretakerEditId} />
            </Container>
        </>
    )
}