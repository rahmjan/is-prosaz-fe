import React, { useEffect, useState } from "react";
import { Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import { AppHeader } from "../menu/AppHeader";
import { ClientShortDto, getClients } from "../../api/clients";
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

export function Clients() {
  const [clients, setClients] = useState<ClientShortDto[]>([]);

  useEffect(() => {
    getClients().then(res => {
      setClients(res);
    })
    .catch(error => {
      console.error("Error in loading of clients...");
    })
  }, []);
  
  return (
    <>
      <AppHeader/>
      <Container>
        <Typography variant="h4" noWrap>Klienti</Typography>
        <TextField variant="outlined" label="Hledat podle příjmení..."/>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Příjmení</TableCell>
                <TableCell>Jméno</TableCell>
                <TableCell>Adresa</TableCell>
                <TableCell>Telefonní číslo</TableCell>
                <TableCell/>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((c, index) =>
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
                    <IconButton>
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
      </Container>
    </>
  )
}