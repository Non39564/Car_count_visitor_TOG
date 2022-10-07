import { useState } from 'react';
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const getStaticPaths = async () => {
    const res = await fetch('http://localhost:8000/visitor_user')
    const data = await res.json()
    console.log(data)
    const paths = data.map(Visitor => {
        return {
            params: {detail : Visitor.Why.toString() }
        }
    })

    return {
        paths,
        fallback: false
    }
    
}


export const getStaticProps = async (context) => {
    const detail = context.params.detail;
    const res = await fetch('http://localhost:8000/Visitor/'+detail);
    const data = await res.json();

    return {
        props: {visitor: data}
    }
}



const Detail_user = ({visitor}) => {
    const closeTab = () => {
        window.open("about:blank", "_self");
        window.close();
      };
    return(
        <Container>
            <Row>
                <Col md={3}></Col>
                <Col md={6}>
                <Card>
                    <Card.Header as="h5" className='bg-success text-white d-flex justify-content-between'>
                        Success <i className="bi bi-check-circle"></i>
                    </Card.Header>
                    <Card.Body>
                        <div>
                        <label  className="control-label d-inline-block text-right">
                            รหัสพนักงาน: 
                        </label>&nbsp;&nbsp;
                        <span>
                            <input 
                            type="text"
                            className="px-0 bg-white border-0"
                            disabled 
                            value={visitor[0].Why}
                            />
                        </span>
                        </div>
                        <div >
                        <label  className="control-label d-inline-block text-right">วัน/เวลา: </label>&nbsp;&nbsp;
                        <input 
                        type="text"
                        className="px-0 bg-white border-0"
                        disabled 
                        value={visitor[1]}
                        />
                        </div>
                        <div className='d-flex justify-content-center mt-2'>
                            <Button onClick={closeTab}  variant="danger">Close</Button>
                        </div>
                    </Card.Body>
                </Card>
                </Col>
                <Col md={3}></Col>
            </Row>
        </Container>
    )
}

export default Detail_user;
