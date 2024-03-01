import { api } from "@/services/api";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

  const router = useRouter();

  const handleSubmit = async (e: any) => {
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
    try {
      const res = await api.post("/user/login", {
        email,
        password,
      });
      if (rememberMe) {
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
        setCookie("clintSession", false, {
          expires: expirationDate,
          secure: false,
          sameSite: "lax",
        });
        window.location.replace("/feed");
      } else {
        window.document.cookie = `token=${res.data.token}; session=true secure=false`;
        window.document.cookie = `id=${res.data.id}; session=true secure=false`;
        window.document.cookie = `clintSession=${true}; session=true secure=false`;
        window.location.replace("/feed");
      }
    } catch (error:any) {
      setErrorEmail(error.response.data.message)
    }
  };

  return (
    <>
      <Box height={"50%"} bgcolor={"#ffff"}>
        <form onSubmit={handleSubmit}>
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
