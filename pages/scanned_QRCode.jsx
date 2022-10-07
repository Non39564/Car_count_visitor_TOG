import Detail_user from "./User/[uid]"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function QRCodeScanned() {
  return (
    <Container>
      <Row>
        <Col md={3}></Col>
        <Col md={6}><Detail_user/></Col>
        <Col md={3}></Col>
      </Row>
    </Container>
  )
}
