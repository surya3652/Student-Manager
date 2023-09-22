import React from "react";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

export default function Footer() {
  return (
    <div>
      <footer className="footer">
        <Container>
          <Row>
            <Col md="3" sm="12">
              <h1 className="title">Student Manager</h1>
            </Col>
            <Col md="6" sm="12">
              <Nav>
                <NavItem>
                  <NavLink href="">Contact Us</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="">About Us</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="">License</NavLink>
                </NavItem>
              </Nav>
            </Col>
            <Col md="3" sm="12">
              <h3 className="title">Follow us:</h3>
              <div className="btn-wrapper profile">
                <Button
                  className="btn-icon btn-neutral btn-round btn-simple"
                  color="default"
                  href="
                    https://twitter.com/creativetim?ref=creativetim"
                  id="tooltip622135962"
                  target="_blank"
                >
                  <i className="fab fa-twitter" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip622135962">
                  Follow us
                </UncontrolledTooltip>
                <Button
                  className="btn-icon btn-neutral btn-round btn-simple"
                  color="default"
                  href="
                    https://www.facebook.com/creativetim?ref=creativetim"
                  id="tooltip230450801"
                  target="_blank"
                >
                  <i className="fab fa-facebook-square" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip230450801">
                  Like us
                </UncontrolledTooltip>
                <Button
                  className="btn-icon btn-neutral btn-round btn-simple"
                  color="default"
                  href="
                    https://www.instagram.com/?hl=en"
                  id="tooltip318450378"
                  target="_blank"
                >
                  <i className="fab fa-instagram" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip318450378">
                  Follow us
                </UncontrolledTooltip>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}
