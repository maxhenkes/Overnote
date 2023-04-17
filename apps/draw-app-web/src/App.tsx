import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import { socket } from "./socket";
import { ConnectionState } from "./components/ConnectionState";
import { LoginBox } from "./components/LoginBox";
import { Canvas } from "./components/Canvas";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@emotion/react";
import { createTheme, useMediaQuery } from "@mui/material";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <div className="App">{isConnected ? <Canvas /> : <LoginBox />}</div>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
