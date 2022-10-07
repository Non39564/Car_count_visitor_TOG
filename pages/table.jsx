import Table_Use from "./component/table_use";
import Head from "next/head";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MDBBtn } from 'mdb-react-ui-kit';

export default function Register() {
  return (
    <div className="container">
      <Head>
        <title>User Data</title>
      </Head>
      <Container>
        <Row>
          <Col><Table_Use /></Col>
        </Row>
      </Container>
    </div>
  );
}
