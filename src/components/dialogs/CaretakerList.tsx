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
    Typography,
    DialogContent,
    DialogTitle,
    Button
} from "@material-ui/core";
import { AppHeader } from "../menu/AppHeader";
import { CaretakerShortDto, getCaretakers } from "../../api/caretakers";
import {CaretakerDetail} from "../dialogs/CaretakerDetail";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddIcon from '@material-ui/icons/Add';
import {Autocomplete} from "@material-ui/lab";

type RequestDetailProps = {
    open: boolean,
    onClose(): void
  }

export function CaretakerList({ open, onClose }: RequestDetailProps) {
    const [caretakers, setCaretakers] = useState<CaretakerShortDto[]>([]);
    const [filteredCaretakers, setFilteredCaretakers] = useState<CaretakerShortDto[]>([]);
    const [caretakerDetailId, setCaretakerDetailId] = useState<number | null>(null);

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

    const onCloseDetail = (event: object, reason: string) => {
        setCaretakerDetailId(null);
    }

    return (
        <Dialog fullWidth maxWidth="lg" open={open} onClose={onClose}>
        <DialogTitle>Pecovatele</DialogTitle>
        <DialogContent>
            <TableContainer>
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
                                        <Button variant="outlined" color="primary" endIcon={<AddIcon/>}>Přidat</Button>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
            </TableContainer>
            <CaretakerDetail open={caretakerDetailId !== null} onClose={onCloseDetail} caretakerId={caretakerDetailId}  />
        </DialogContent>
        </Dialog>
    )
}