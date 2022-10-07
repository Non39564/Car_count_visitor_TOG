import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useState } from 'react';
import axios from 'axios';
import { useSession } from "next-auth/react"

export default function addUser() {
    const { data: session, status } = useSession()

    const [Employee_ID, setEmployee_ID] = useState('');
    const [Name, setName] = useState('');
    const [Phone, setPhone] = useState('');
    const [Agency, setAgency] = useState('');
    const [Company, setCompany] = useState('');
    const [Company_dormitory, setCompany_dormitory] = useState('');
    const [CarRegis, setCarRegis] = useState('');
    const [Type_vehicle, setType_vehicle] = useState('');
    const [Zone, setZone] = useState('');

    function handleSend() {
        axios.post("http://127.0.0.1:8000/insertOnce", {
            "Employee_ID": Employee_ID,
            "Name": Name,
            "Phone": Phone,
            "Agency": Agency,
            "Company": Company,
            "Company_dormitory": Company_dormitory,
            "CarRegis": CarRegis,
            "Type_vehicle": Type_vehicle,
            "Zone": Zone
        })
    }

    if (session) {
        return (
            <Container>
                <Row className="d-flex justify-content-center">
                    <Card className="col-sm-4 col-md-6 ">
                        <Card.Header className="row bg-info text-white">Add User</Card.Header>
                        <div className="row p-2">
                            <div className="mb-3">
                                <MDBInput label='Employee ID' id='typeText' type='text' placeholder='S652248'
                                    value={Employee_ID} onInput={e => setEmployee_ID(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <MDBInput label='Name' id='typeText' type='text' placeholder='ศราวุธ ดุลหาล'
                                    value={Name} onInput={e => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <MDBInput label='Phone' id='typePhone' type='tel' placeholder='(ไม่ต้องมี0) 945XXXXXX'
                                    value={Phone} onInput={e => setPhone(e.target.value)} />
                            </div>
                            <div className="col-6 mb-3">
                                <MDBInput label='Agency' id='typeText' type='text' placeholder=''
                                    value={Agency} onInput={e => setAgency(e.target.value)} />
                            </div>
                            <div className="col-6 mb-3">
                                <MDBInput label='Company' id='typeText' type='text'
                                    value={Company} onInput={e => setCompany(e.target.value)} />
                            </div>
                            <div className="col-6 mb-3">
                                <MDBInput label='Company dormitory' id='typeText' type='text'
                                    value={Company_dormitory} onInput={e => setCompany_dormitory(e.target.value)} />
                            </div>
                            <div className="col-6 mb-3">
                                <MDBInput label='Car regis' id='typeText' type='text'
                                    value={CarRegis} onInput={e => setCarRegis(e.target.value)} />
                            </div>
                            <div className="col-6 mb-3">
                                <MDBInput label='Type vehicle' id='typeText' type='text'
                                    value={Type_vehicle} onInput={e => setType_vehicle(e.target.value)} />
                            </div>
                            <div className="col-6 mb-3">
                                <MDBInput label='Zone' id='typeText' type='text'
                                    value={Zone} onInput={e => setZone(e.target.value)} />
                            </div>
                            <div className="d-flex justify-content-center mb-2">
                                <MDBBtn  color='info' onClick={handleSend}>Add</MDBBtn>
                            </div>
                        </div>
                    </Card>
                </Row>
            </Container>
        )
    }
};