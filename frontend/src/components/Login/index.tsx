import { Box, Button, Container, TextField, FormLabel, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Box height={"50%"} bgcolor={"#ffff"}>
        <FormLabel>E-mail</FormLabel>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Digite o seu e-mail"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormLabel>Senha</FormLabel>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Digite sua senha"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Entrar
        </Button>
        <FormControlLabel
            control={
              <Checkbox  name="antoine" />
            }
            label="Lembra-se de mim"
          />
      </Box>
    </>
  );
};
