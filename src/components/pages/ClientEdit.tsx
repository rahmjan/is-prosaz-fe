import React, { useEffect, useState } from "react";
import { Container, Box, TextField, Typography, makeStyles, Button, ListItem, List, ListItemText, FormControl, InputLabel, Select, Dialog, DialogTitle, MenuItem } from "@material-ui/core";
import { AppHeader } from '../menu/AppHeader';
import { UserDto, findUser } from "../../api/users";

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
  address: "Testova 6",
  phone: "0123456789"
}

export function ClientEdit() {

  const [user, setUser] = useState<UserDto>();

  useEffect(() => {
    findUser(0).then(res => {
      setUser(res);
    })
    .catch(error => {
      console.error("Error in loading of User...");
    })
  }, );

  return (
    <>
      <AppHeader/>
      <Container>
      <Typography variant="h4" noWrap>Profil klienta</Typography>
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
          <Typography variant="h5">Adresa</Typography>
          <TextField
            required
            variant="standard"
            margin="normal"
            defaultValue={test_person.address}
          />
          <Typography variant="h5">Telefonní číslo</Typography>
          <TextField
            required
            variant="standard"
            margin="normal"
            defaultValue={test_person.phone}
          />
        </Box>
        
        <Button color="primary" variant="contained">Uložit změny</Button>
      </Container>
    </>
  )
}
