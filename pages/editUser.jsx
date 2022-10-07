import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';

export default function EditUser() {

    const [User, setUser] = useState();
    const [Registration, setRegistration] = useState();
    const [IDCard, setIDCard] = useState();
    const [Employee_ID, setEmployee_ID] = useState();
    const [Name, setName] = useState();
    const [Agency, setAgency] = useState();
    const [ZONE, setZONE] = useState();
    const [Car_type, setCar_type] = useState();
    const [Phone_number, setPhone_number] = useState();
    const [Company_Dormitory, setCompany_Dormitory] = useState();

    function search() {
        axios.get("http://localhost:8000/search_data/" + User).then((response) => {
            console.log(response.data)
            setRegistration(response.data[0].car_regis)
            // setIDCard(response.data[0])
            setEmployee_ID(response.data[0].Employee_ID)
            setName(response.data[0].Name)
            setAgency(response.data[0].Agency)
            setZONE(response.data[0].Zone)
            setCar_type(response.data[0].type_vehicle)
            setPhone_number(response.data[0].Phone)
            setCompany_Dormitory(response.data[0].company_dormitory)
        })
    }

    function handleSend() {
        axios.post("http://127.0.0.1:8000/updateuser", {
            "Employee_ID": Employee_ID,
            "Name": Name,
            "Phone": Phone_number,
            "Agency": Agency,
            "Company": '',
            "Company_dormitory": Company_Dormitory,
            "CarRegis": Registration,
            "Type_vehicle": Car_type,
            "Zone": ZONE
        }).then(
            window.location.reload(true)
        )
    }

    return (
        <Container>
            <MDBInputGroup className='d-flex justify-content-center'>
                <MDBInput label='Search' placeholder='Employee ID' value={User} onInput={e => setUser(e.target.value)} />
                <MDBBtn rippleColor='dark' onClick={search}>
                    <i class="bi bi-search"></i>
                </MDBBtn>
            </MDBInputGroup>
            <Row className='d-flex justify-content-center'>
                <Card className="col-sm-4 col-md-6 m-3 ">
                    <Card.Header className="row bg-info text-white">Edit User</Card.Header>
                    <div className="row p-2">
                        <div className="col-6 mb-3">
                            <MDBInput label='Car Registration' id='typeText' type='text' value={Registration}
                                onInput={e => setRegistration(e.target.value)} placeholder='ทะเบียนรถ' />
                        </div>
                        {/* <div className="col-6 mb-3">
                            <MDBInput label='ID card' id='typeText' type='tel' placeholder='บัตรประชาชน' />
                        </div> */}
                        <div className="mb-3">
                            <MDBInput label='Employee ID' id='typeText' type='text' value={Employee_ID} placeholder='รหัสพนักงาน'
                                onInput={e => setEmployee_ID(e.target.value)} />
                        </div>
                        <div className="col-12 mb-3">
                            <MDBInput label='Name' id='typeText' type='tel' value={Name} placeholder='ชื่อ-นามสกุล'
                                onInput={e => setName(e.target.value)} />
                        </div>
                        <div className="col-6 mb-3">
                            <MDBInput label='Agency' id='typeText' type='tel' value={Agency} placeholder='หน่วยงาน'
                                onInput={e => setAgency(e.target.value)} />
                        </div>
                        <div className="col-6 mb-3">
                            <MDBInput label='ZONE' id='typeText' type='tel' value={ZONE} placeholder='zone'
                                onInput={e => setZONE(e.target.value)} />
                        </div>
                        <div className="col-6 mb-3">
                            <MDBInput label='Car type' id='typeText' type='tel' value={Car_type} placeholder='ประเภทรถ'
                                onInput={e => setCar_type(e.target.value)} />
                        </div>
                        <div className="col-6 mb-3">
                            <MDBInput label='Phone number' id='typeText' type='tel' value={Phone_number} placeholder='เบอร์โทร'
                                onInput={e => setPhone_number(e.target.value)} />
                        </div>
                        <div className="col-12 mb-3">
                            <MDBInput label='Company Dormitory' id='typeText' type='tel' value={Company_Dormitory} placeholder='อยู่หอพักบริษัท'
                                onInput={e => setCompany_Dormitory(e.target.value)} />
                        </div>
                        <div className="d-flex justify-content-center mb-2">
                            <MDBBtn onClick={handleSend}>Add</MDBBtn>
                        </div>
                    </div>
                </Card>
            </Row>
        </Container>
    );
}