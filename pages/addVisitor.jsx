import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { MDBInput,MDBBtn } from 'mdb-react-ui-kit';


export default function addVisitor() {
    return (
        <Container>
            <Row className="d-flex justify-content-center">
                <Card className="col-sm-4 col-md-6 ">
                <Card.Header className="row bg-info text-white">Add Visitor</Card.Header>
                    <div className="row p-2">
                        <div className="mb-3">
                            <MDBInput label='Date' id='typeText' type='text' placeholder='20/12/2'/>
                        </div>
                        <div className="col-6 mb-3">
                            <MDBInput label='On Passed' id='typeText' type='text' placeholder='11'/>
                        </div>
                        <div className="col-6 mb-3">
                            <MDBInput label='Visitor' id='typePhone' type='tel' placeholder='10' />
                        </div>
                        <div className="d-flex justify-content-center mb-2">
                            <MDBBtn color='info' >Add</MDBBtn>
                        </div>
                    </div>
                </Card>
            </Row>
        </Container>
    )
};