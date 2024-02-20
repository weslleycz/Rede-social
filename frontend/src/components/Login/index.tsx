import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { isEmail } from "validator";

type Props = {
  setIsRegister: any;
};

export const Login = ({ setIsRegister }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const updateTheme = (event: any) => {
      setIsDarkMode(event.matches);
    };

    darkModeMediaQuery.addListener(updateTheme);

    updateTheme(darkModeMediaQuery);

    return () => {
      darkModeMediaQuery.removeListener(updateTheme);
    };
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (email === "") {
      setErrorEmail("Você precisa informar o seu e-mail");
      return;
    }
    if (password === "") {
      setErrorEmail("Você precisa informar o seu e-mail");
      return;
    }
    if (!isEmail(email)) {
      setErrorEmail("Este e-mail não é válido");
      return;
    }

    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 72 * 60 * 60 * 1000);

    if (rememberMe) {
    } else {
    }
  };

  return (
    <>
      <Box height={"50%"} bgcolor={isDarkMode ? "#0a0a0a" : "#ffff"}>
        <form onSubmit={handleSubmit}>
          <FormLabel>
            E-mail
          </FormLabel>
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
            onFocus={() => setErrorEmail("")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorEmail && <Typography color="error">{errorEmail}</Typography>}
          <FormLabel>
            Senha
          </FormLabel>
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
            onFocus={() => setErrorPassword("")}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorPassword && (
            <Typography color="error">{errorPassword}</Typography>
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                name="antoine"
              />
            }
            label="Lembra-se de mim"
          />
          <Button
            size="large"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Entrar
          </Button>
          <Button
            onClick={() => setIsRegister(true)}
            fullWidth
            sx={{ marginTop: 1 }}
            variant="text"
          >
            Inscrever-se
          </Button>
        </form>
      </Box>
    </>
  );
};
