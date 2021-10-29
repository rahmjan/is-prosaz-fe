import { Dialog, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useEffect, useState } from "react";
import { getTasksForRequest, TaskDto } from "../../api/tasks";
import { RequestForm } from "../forms/RequestForm";

type RequestDetailProps = {
  open: boolean,
  onClose(event: object, reason: string): void
  requestId: number | null
}

export function RequestDetail({ open, onClose, requestId }: RequestDetailProps) {
  const [tasks, setTasks] = useState<TaskDto[]>([]);

  useEffect(() => {
    if (requestId !== null) {
      getTasksForRequest(requestId).then(res => {
        setTasks(res);
      })
        .catch(error => {
          console.error("Error in loading of tasks...");
        })
    }
  }, [requestId]);

  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={onClose}>
      <DialogTitle>Detail požadavku</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" noWrap>Údaje</Typography>
        <RequestForm />

        <Typography variant="subtitle1" noWrap>Úkoly</Typography>

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
              {tasks.map((c, index) =>
                <TableRow key={index}>
                  <TableCell>{c.activity}</TableCell>
                  <TableCell>{c.duration}</TableCell>
                  <TableCell align="right">
                    <IconButton>
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
      </DialogContent>
    </Dialog>
  );
}