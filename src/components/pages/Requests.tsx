import React, { useEffect, useState } from "react";
import { Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { AppHeader } from "../menu/AppHeader";
import { RequestDto, getRequests } from "../../api/requests";
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { RequestDetail } from "../dialogs/RequestDetail";

export function Requests() {
  const [requests, setRequests] = useState<RequestDto[]>([]);
  const [requestDetailId, setRequestDetailId] = useState<number | null>(null);

  const onCloseDetail = (event: object, reason: string) => {
    setRequestDetailId(null);
  }

  useEffect(() => {
    getRequests().then(res => {
      setRequests(res);
    })
      .catch(error => {
        console.error("Error in loading of requests...");
      })
  }, []);


  return (
    <>
      <AppHeader />
      <Container>
        <Typography variant="h4" noWrap>Požadavky</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Aktivita</TableCell>
                <TableCell>Doba trvání</TableCell>
                <TableCell>Nejdřívější začátek</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((r, index) =>
                <TableRow key={index}>
                  <TableCell>{r.activity}</TableCell>
                  <TableCell>{r.duration}</TableCell>
                  <TableCell>{r.earliestStart}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => setRequestDetailId(r.id)}>
                      <MoreHorizIcon />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <RequestDetail open={requestDetailId !== null} requestId={requestDetailId} onClose={onCloseDetail} />
      </Container>
    </>
  )
}