import {
  Container,
  Nav,
  NavDropdown,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "react-bootstrap";
import Image from "next/image";
import logo from "../components/logo.png";
import styles from "./Pagina.module.css";

export default function Pagina(props) {
  return (
    <>
      <Navbar className={styles.navbar} expand="lg">
        <Container fluid>
          <NavbarBrand className={styles.brand} href="/">
            <Image src={logo} alt="Logo" height={80} />
          </NavbarBrand>
          <Nav className="me-start">
          <NavLink className={styles.titleDom} href="/">
              VinhoDom
            </NavLink>
          </Nav>
          <Nav className="me-end">
            <NavLink className={styles.navLink} href="/vinhos">
              Vinhos
            </NavLink>
            <NavLink className={styles.navLink} href="/clientes">
              Clientes{" "}
            </NavLink>
            <NavLink className={styles.navLink} href="/fornecedores">
              Fornecedores{" "}
            </NavLink>
            <NavLink className={styles.navLink} href="/pedidos">
              Pedidos
            </NavLink>
            <NavLink className={styles.navLink} href="/frios">
              Frios
            </NavLink>
          </Nav>
        </Container>
      </Navbar>

      <Container>{props.children}</Container>
    </>
  );
}
