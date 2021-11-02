import React, { useEffect, useState } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Button, ButtonGroup, makeStyles, Dialog, DialogActions, DialogTitle, DialogContentText } from "@material-ui/core";
import { AppHeader } from '../menu/AppHeader';
import { UserDto, getUsers } from "../../api/users";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from "react-router-dom";

const useStyle = makeStyles({
  table: {

  }
});

export function Users() {
  const classes = useStyle();
  const [users, setUsers] = useState<UserDto[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserDto[]>([]);
  const [roleFilter, setRoleFilter] = useState('');
  const [surnameFilter, setSurnameFilter] = useState('');
  const [firstnameFilter, setFirstnameFilter] = useState('');

  useEffect(() => {
    getUsers().then(res => {
      setUsers(res);
      setFilteredUsers(res);
    })
    .catch(error => {
      console.error("Error in loading of Users...");
    })
  }, []);

  const filterRole = (e: any) => {
    const keyword = e.target.value;

    if(keyword !== '') {
      const result = users.filter((person) => {
        return person.roles.toString().toLowerCase().includes(keyword.toLowerCase());
      });
      setFilteredUsers(result);
    }
    else {
      setFilteredUsers(users);
    }
    setRoleFilter(keyword);
  }

  const filterSurname = (e: any) => {
    const keyword = e.target.value;

    if(keyword !== '') {
      const result = users.filter((person) => {
        return person.surname.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFilteredUsers(result);
    }
    else {
      setFilteredUsers(users);
    }
    setSurnameFilter(keyword);
  }

  const filterFirstName = (e: any) => {
    const keyword = e.target.value;

    if(keyword !== '') {
      const result = users.filter((person) => {
        return person.name.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFilteredUsers(result);
    }
    else {
      setFilteredUsers(users);
    }
    setFirstnameFilter(keyword);
  }

  const [open, setOpen] = useState(false);

  const handleDeleteOpen = () => {
    setOpen(true);
  };

  const handleDeleteClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppHeader/>
      <Container>
        <Typography variant="h4" noWrap>Uživatelé</Typography>
        <TableContainer>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Role</TableCell>
                <TableCell>Příjmení</TableCell>
                <TableCell>Jméno</TableCell>
                <TableCell width={200}/>
              </TableRow>
              <TableRow>
                <TableCell width={600} align="left">
                  <TextField
                    value={roleFilter}
                    onChange={filterRole}
                    variant="outlined"
                    label="Hledat podle role..."/>
                </TableCell>
                <TableCell width={250} align="left">
                  <TextField
                    value={surnameFilter}
                    onChange={filterSurname}
                    variant="outlined"
                    label="Hledat podle příjmení..."/>
                </TableCell>
                <TableCell width={250} align="left">
                  <TextField
                    value={firstnameFilter}
                    onChange={filterFirstName}
                    variant="outlined"
                    label="Hledat podle jména..."/>
                </TableCell>
                <TableCell width={200}/>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers && filteredUsers.length > 0 ? (
                filteredUsers.map((c, index) =>
                <TableRow key={index}>
                  <TableCell width={600} align="left">{c.roles.toString()}</TableCell>
                  <TableCell width={250} align="left">{c.surname}</TableCell>
                  <TableCell width={250} align="left">{c.name}</TableCell>
                  <TableCell width={200} align="right">
                    <ButtonGroup variant="text" aria-label="outlined primary button group">
                      <Link to="/useredit" style={{textDecoration: 'none'}}>
                        <Button endIcon={<EditIcon/>}>Edit</Button>
                      </Link>              
                      <Button onClick={handleDeleteOpen} endIcon={<DeleteIcon/>}>Delete</Button>
                      <Dialog
                        open={open}
                        onClose={handleDeleteClose}
                      >
                        <DialogTitle>Opravdu chcete vymazat uživatele?</DialogTitle>
                        <DialogContentText variant="h6" align="center">{c.name} {c.surname}</DialogContentText>
                        <DialogActions>
                          <Button variant="outlined" color="primary" onClick={handleDeleteClose} endIcon={<CloseIcon/>}>Zrušit</Button>
                          <Button variant="outlined" color="secondary" onClick={handleDeleteClose} endIcon={<DeleteIcon/>} autoFocus>Vymazat</Button>
                        </DialogActions>
                      </Dialog>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              )
              ) : (
                <Typography variant="h6" noWrap>Nenašli se uživatelé</Typography>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}