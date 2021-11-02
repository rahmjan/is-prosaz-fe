import React, { useEffect, useState } from "react";
import { Container, Box, TextField, Typography, makeStyles, Button, ListItem, List, ListItemText, FormControl, InputLabel, Select, Dialog, DialogTitle, MenuItem } from "@material-ui/core";
import { AppHeader } from "../menu/AppHeader";
import { UserDto, findUser } from "../../api/users";
import DeleteIcon from '@material-ui/icons/Delete';

const roles = ["ADMIN", "COORDINATOR", "SHIFT_LEADER", "CARETAKER"]
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const test_person = {
  name: "Test",
  surname: "Tester",
  roles: ["ADMIN", "COORDINATOR", "SHIFT_LEADER"],
  email: "test@t.cz"
}

export function UserEdit() {

  const [user, setUser] = useState<UserDto>();
  const [newRole, setNewRole] = useState<string[]>([]);
  const [newRoles, setNewRoles] = useState<string[]>([]);

  useEffect(() => {
    setNewRoles(test_person.roles);
    findUser(0).then(res => {
      setUser(res);
    })
    .catch(error => {
      console.error("Error in loading of User...");
    })
  }, );

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setNewRole(
      typeof value === 'string' ? value.split(',') : value,
    );
    if(newRoles.includes(value)) {
      alert("Role uz existuje");
    }
    else {
      let tmp_roles = newRoles;
      tmp_roles.push(value);
      setNewRoles(tmp_roles);
    }
  };

  const handleDelete = (event: any) => {
    let tmp_roles = newRoles;
    tmp_roles = tmp_roles.splice(event, 1);
    setNewRoles(tmp_roles);
  };

  return (
    <>
      <AppHeader/>
      <Container>
      <Typography variant="h4" noWrap>Profil uživatele</Typography>
        <Box>
          <Typography variant="h5">Jméno</Typography>
          <TextField
            required
            variant="standard"
            margin="normal"
            defaultValue={test_person.name}
          />
          <Typography variant="h5">Přijmení</Typography>
          <TextField
            required
            variant="standard"
            margin="normal"
            defaultValue={test_person.surname}
          />
          <Typography variant="h5">Email</Typography>
          <TextField
            disabled
            variant="standard"
            margin="normal"
            defaultValue={test_person.email}
          />
        </Box>
        <Box>
          <Typography variant="h5">Role</Typography>
          <FormControl style={{width: 500}}>
            <InputLabel >Přidat roli</InputLabel>
            <Select

              value={newRole}
              onChange={handleChange}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>{role}</MenuItem>
              ))}
            </Select>
          </FormControl>
            {newRoles.map((role, index) =>
              <ListItem key={role}>
                <ListItemText primary={role}/>
                <Button variant="outlined" onClick={() => handleDelete(index)} endIcon={<DeleteIcon />}>
                  Odstranit
                </Button>
              </ListItem>
            )}
        </Box>
        <Button color="primary" variant="contained">Uložit změny</Button>
      </Container>
    </>
  )
}
