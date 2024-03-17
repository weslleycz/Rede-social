import { api } from "@/services/api";
import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isEmail } from "validator";

type Props = {
  setIsRegister: any;
};

export const Register = ({ setIsRegister }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name === "") {
      setErrorName("O campo de nome não pode estar vazio");
      return;
    }

    if (email === "") {
      setErrorPassword("O campo de e-mail não pode estar vazio");
      return;
    }

    if (!isEmail(email)) {
      setErrorEmail("Este e-mail não é válido");
      return;
    }

    if (password === "") {
      setErrorPassword("O campo de senha não pode estar vazio");
      return;
    }

    if (password !== confirmPassword) {
      setErrorConfirmPassword("As senhas digitadas não coincidem");
      return;
    }
    try {
      const res = await api.post("/user", {
        email,
        name,
        password,
      });
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + 72 * 60 * 60 * 1000);
      setCookie("token", res.data.token, {
        expires: expirationDate,
        secure: false,
        sameSite: "lax",
      });
      setCookie("id", res.data.id, {
        expires: expirationDate,
        secure: false,
        sameSite: "lax",
      });
      window.location.replace("/feed");
    } catch (error: any) {
      setErrorName(error.response.data.message);
    }
  };
  return (
    <>
      <Box width={"100%"} height={"80%"}>
        <form onSubmit={handleSubmit}>
          <FormLabel>Nome</FormLabel>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Digite o seu nome"
            name="username"
            autoComplete="username"
            autoFocus
            onFocus={() => setErrorName("")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errorName && <Typography color="error">{errorName}</Typography>}

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
            onFocus={() => setErrorEmail("")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorEmail && <Typography color="error">{errorEmail}</Typography>}

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
            onFocus={() => setErrorPassword("")}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorPassword && (
            <Typography color="error">{errorPassword}</Typography>
          )}

          <FormLabel>Confirmar senha</FormLabel>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirmar a sua senha"
            name="errorConfirmPassword"
            type="password"
            autoFocus
            onFocus={() => setErrorConfirmPassword("")}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errorConfirmPassword && (
            <Typography color="error">{errorConfirmPassword}</Typography>
          )}

          <Button
            size="large"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Criar
          </Button>
          <Button
            onClick={() => setIsRegister(false)}
            fullWidth
            sx={{ marginTop: 1 }}
            variant="text"
          >
            Já tenho conta
          </Button>
        </form>
      </Box>
    </>
  );
};
