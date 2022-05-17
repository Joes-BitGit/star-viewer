import "./App.css";
import { StarForm } from "./components/StarForm";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#home">Star Patterns</Navbar.Brand>
        </Container>
      </Navbar>
      <StarForm />
    </>
  );
}

export default App;
