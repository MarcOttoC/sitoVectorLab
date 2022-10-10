import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

interface Props {

  fastNav: (index:number) => void
}

const NavbarSite:React.FunctionComponent<Props> = (props) =>{

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>VectorLab</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => props.fastNav(0)}>VR</Nav.Link>
              <Nav.Link onClick={() => props.fastNav(1)}>AR</Nav.Link>
              <Nav.Link onClick={() => props.fastNav(2)}>GameDev</Nav.Link>
              <Nav.Link onClick={() => props.fastNav(3)}>Gamification</Nav.Link>
              <Nav.Link onClick={() => props.fastNav(4)}>3D</Nav.Link>
              <Nav.Link onClick={() => props.fastNav(5)}>ProceduralAI</Nav.Link>
              <Nav.Link onClick={() => props.fastNav(6)}>Animation</Nav.Link>
              <Nav.Link onClick={() => props.fastNav(7)}>Academy</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarSite;