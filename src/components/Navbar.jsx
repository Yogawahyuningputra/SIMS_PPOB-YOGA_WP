import { Container, Navbar, Image, Nav } from "react-bootstrap";
import Logo from "../assets/icons/Logo.png";
import { useNavigate } from "react-router-dom";

const Navbars = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar className="bg-body-light">
        <Container className="d-flex justify-content-between align-items-center fw-bold">
          <Navbar.Brand
            onClick={() => navigate("/dashboard")}
            style={{ cursor: "pointer" }}
          >
            <Image src={Logo} alt="icon" />
            <Navbar.Text className="fw-bold mx-2">SIMS PPOB</Navbar.Text>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end fw-bold">
            <Nav>
              <Nav.Link onClick={() => navigate("/topup")}>Top Up</Nav.Link>
              <Nav.Link onClick={() => navigate("/transaction")}>
                Transaction
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/profile")}>Akun</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navbars;
