import React, { useEffect, useState } from "react";
import { Container, Box, TextField, Typography, makeStyles, Button, ListItem, List, ListItemText, FormControl, InputLabel, Select, Dialog, DialogTitle, DialogContent, MenuItem } from "@material-ui/core";
import { UserDto, findUser, UserDetailProps } from "../../api/users";
import { ROLE, Gender } from "../../utils/constants"
import DeleteIcon from '@material-ui/icons/Delete';

const default_user = {
    id: 0,
    name: "",
    surname: "",
    title: "",
    gender: "MALE" as Gender,
    address: {
        descriptiveNum: "",
        id: 0,
        orientationNumber: "",
        postalCode: "",
        streetName: "",
        town: ""
    },
    phoneNumber: "",
    email: "",
    roles: { ROLE: "ADMIN" } as unknown as ROLE[],
}

export function UserEdit({ open, onClose, userId }: UserDetailProps) {

  const [user, setUser] = useState<UserDto>(default_user);
  const [newRole, setNewRole] = useState<string[]>([]);
  const [newRoles, setNewRoles] = useState<string[]>([]);

  useEffect(() => {
    if (userId !== null) {
        findUser(userId).then(res => {
            setUser(res);
        })
            .catch(error => {
                console.error("Error in loading of User...");
            })
    }
}, [userId]);

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
    <Dialog fullWidth maxWidth="lg" open={open} onClose={onClose}>
    <DialogTitle>Úprava uživatele</DialogTitle>
        <DialogContent>
        <Container>
        <Typography variant="h4" noWrap>Profil uživatele</Typography>
          <Box>
            <Typography variant="h5">Jméno</Typography>
            <TextField
              required
              variant="standard"
              margin="normal"
              defaultValue={user.name}
            />
            <Typography variant="h5">Přijmení</Typography>
            <TextField
              required
              variant="standard"
              margin="normal"
              defaultValue={user.surname}
            />
            <Typography variant="h5">Email</Typography>
            <TextField
              disabled
              variant="standard"
              margin="normal"
              defaultValue={user.email}
            />
          </Box>
          <Box>
            <Typography variant="h5">Role</Typography>
            <FormControl style={{width: 500}}>
              <InputLabel >Přidat roli</InputLabel>
              
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
      </DialogContent>
    </Dialog>
  )
}
