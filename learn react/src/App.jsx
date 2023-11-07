import Container from "@mui/material/Container";

import "./App.css";
import Maincopunted from "./components/maincopunted";

function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100vw",
        }}
      >
        <Container maxWidth="xl">
          <Maincopunted />
        </Container>
      </div>
    </>
  );
}

export default App;
