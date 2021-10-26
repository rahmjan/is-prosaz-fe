import React, { useEffect, useState } from "react";
import { Button, Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { AppHeader } from "../menu/AppHeader";
import { TaskDto, getTasks } from "../../api/tasks";
import DeleteIcon from '@material-ui/icons/Delete';

export function Tasks() {
  const [tasks, setTasks] = useState<TaskDto[]>([]);

  useEffect(() => {
    getTasks().then(res => {
      setTasks(res);
    })
      .catch(error => {
        console.error("Error in loading of tasks...");
      })
  }, []);


  return (
    <>
      <AppHeader />
      <Container>
        <Typography variant="h4" noWrap>Úkoly</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Aktivita</TableCell>
                <TableCell>Doba trvání</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((r, index) =>
                <TableRow key={index}>
                  <TableCell>{r.activity}</TableCell>
                  <TableCell>{r.duration}</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <DeleteIcon />
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