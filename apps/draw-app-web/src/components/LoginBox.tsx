import { FormEvent } from "react";
import "./loginForm.css";
import { socket } from "../socket";
import { Box, Button, Container, Stack, TextField } from "@mui/material";

export const LoginBox = () => {
  const handleConnect = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    connect();
  };

  const connect = () => {
    socket.connect();
  };

  const disconnect = () => {
    socket.disconnect();
  };

  return (
    <Container maxWidth="sm" sx={{}}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Stack direction="row" spacing={2} padding={2}>
          <TextField required id="username" label="Username" defaultValue="" />
          <TextField required id="canvas" label="Canvas" defaultValue="" />
          <Button variant="contained" onClick={(event) => handleConnect(event)}>
            Connect
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};
