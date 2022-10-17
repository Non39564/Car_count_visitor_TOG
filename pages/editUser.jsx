import { MDBInputGroup, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useSession } from "next-auth/react"
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function EditUser() {
    const { data: session, status } = useSession()
    const [User, setUser] = useState();
    const [Registration, setRegistration] = useState();
    const [IDCard, setIDCard] = useState();
    const [Employee_ID, setEmployee_ID] = useState();
    const [Name, setName] = useState();
    const [Agency, setAgency] = useState('');
    const [ZONE, setZONE] = useState('');
    const [Car_type, setCar_type] = useState('');
    const [Phone_number, setPhone_number] = useState();
    const [Company_Dormitory, setCompany_Dormitory] = useState('');
    const [Status_type, setStatus_type] = useState('');
    const [Company, setCompany] = useState('');
    const [State_Select, setState_Select] = useState();
    const [Company_Select, setCompany_Select] = useState();
    const [Company_Dormitory_Select, setCompany_Dormitory_Select] = useState();
    const [Car_type_Select, setCar_type_Select] = useState();
    const [ZONE_Select, setZONE_Select] = useState();
    const [Agency_Select, setAgency_Select] = useState();

    useEffect(() => {
        (async () => {
            await axios.get("http://localhost:8000/status_detail").then((response) => {
                setStatus_type(response.data)
            });
            await axios.get("http://localhost:8000/agency").then((response) => {
                setAgency(response.data)
            })
            await axios.get("http://localhost:8000/type_vehicle").then((response) => {
                setCar_type(response.data)
            })
            await axios.get("http://localhost:8000/zone").then((response) => {
                setZONE(response.data)
            })
            await axios.get("http://localhost:8000/company").then((response) => {
                setCompany(response.data)
            })
            await axios.get("http://localhost:8000/company_dormitory").then((response) => {
                setCompany_Dormitory(response.data)
            })
        })();
    }, [])

    function search() {
        axios.get("http://localhost:8000/search_data/" + User).then((response) => {
            setRegistration(response.data[0].car_regis)
            // setIDCard(response.data[0])
            setEmployee_ID(response.data[0].Employee_ID)
            setName(response.data[0].Name)
            setAgency_Select(response.data[0].Agency)
            setZONE_Select(response.data[0].Zone)
            setCar_type_Select(response.data[0].type_vehicle)
            setPhone_number(response.data[0].Phone)
            setCompany_Dormitory_Select(response.data[0].company_dormitory)
            setCompany_Select(response.data[0].company)
            setState_Select(response.data[0].Active)
        })
    }

    function handleSend() {
        axios.post("http://127.0.0.1:8000/updateuser", {
            "Employee_ID": Employee_ID,
            "Name": Name,
            "Phone": Phone_number,
            "Agency": Agency_Select,
            "Company": Company_Select,
            "Company_dormitory": Company_Dormitory_Select,
            "CarRegis": Registration,
            "Type_vehicle": Car_type_Select,
            "Zone": ZONE_Select,
            "Status_type": State_Select
        }).then(
            window.location.reload(true)
        )
    }
    if (session) {
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
                            <div className="col-12 mb-3">
                                <MDBInput label='Employee ID' id='typeText' type='text' value={Employee_ID} placeholder='รหัสพนักงาน'
                                    onInput={e => setEmployee_ID(e.target.value)} />
                            </div>
                            <div className="col-12 mb-3">
                                <MDBInput label='Name' id='typeText' type='text' value={Name} placeholder='ชื่อ-นามสกุล'
                                    onInput={e => setName(e.target.value)} />
                            </div>
                            <div className="col-6 mb-3">
                                <MDBInput label='Phone number' id='typeText' type='tel' value={Phone_number} placeholder='เบอร์โทรศัพท์ (ไม่ต้องมี 0 ด้านหน้า)'
                                    onInput={e => setPhone_number(e.target.value)} />
                            </div>
                            <div className="col-6 mb-3">
                                <MDBInput label='Car Registration' id='typeText' type='text' value={Registration}
                                    onInput={e => setRegistration(e.target.value)} placeholder='ทะเบียนรถ' />
                            </div>
                            {/* <div className="col-6 mb-3">
                            <MDBInput label='ID card' id='typeText' type='tel' placeholder='บัตรประชาชน' />
                        </div> */}
                            <div className="col-6 mb-3">
                                <Form.Select label='Phone number' aria-label="Default select example">
                                    <option>Agency</option>
                                    {Object.entries(Agency).map(data => (
                                        <option value={data[1].ID} selected={Agency_Select == data[1].Detail}>{data[1].Detail}</option>
                                    ))}
                                </Form.Select>
                                {/* <MDBInput label='Agency' id='typeText' type='text' value={Agency} placeholder='หน่วยงาน'
                                onInput={e => setAgency(e.target.value)} /> */}
                            </div>
                            <div className="col-6 mb-3">
                                <Form.Select aria-label="Default select example">
                                    <option>Company</option>
                                    {Object.entries(Company).map(data => (
                                        <option value={data[1].ID} selected={Company_Select == data[1].Detail}>{data[1].Detail}</option>
                                    ))}
                                </Form.Select>
                                {/* <MDBInput label='Company' id='typeText' type='text' value={Company} placeholder='บริษัท'
                                onInput={e => setCompany(e.target.value)} /> */}
                            </div>
                            <div className="col-6 mb-3">
                                <Form.Select aria-label="Default select example">
                                    <option>Company Dormitory</option>
                                    {Object.entries(Company_Dormitory).map(data => (
                                        <option value={data[1].ID} selected={Company_Dormitory_Select == data[1].Detail}>{data[1].Detail}</option>
                                    ))}
                                </Form.Select>
                                {/* <MDBInput label='Company Dormitory' id='typeText' type='text' value={Company_Dormitory} placeholder='อยู่หอพักบริษัท'
                                onInput={e => setCompany_Dormitory(e.target.value)} /> */}
                            </div>
                            <div className="col-6 mb-3">
                                <Form.Select aria-label="Default select example">
                                    <option>Type vehicle</option>
                                    {Object.entries(Car_type).map(data => (
                                        <option value={data[1].ID} selected={Car_type_Select == data[1].Detail}>{data[1].Detail}</option>
                                    ))}
                                </Form.Select>
                                {/* <MDBInput label='Type vehicle' id='typeText' type='text' value={Car_type} placeholder='ประเภทรถ'
                                onInput={e => setCar_type(e.target.value)} /> */}
                            </div>
                            <div className="col-6 mb-3">
                                <Form.Select aria-label="Default select example">
                                    <option>ZONE</option>
                                    {Object.entries(ZONE).map(data => (
                                        <option value={data[1].ID} selected={ZONE_Select == data[1].Detail}>{data[1].Detail}</option>
                                    ))}
                                </Form.Select>
                                {/* <MDBInput label='ZONE' id='typeText' type='text' value={ZONE} placeholder='zone'
                                onInput={e => setZONE(e.target.value)} /> */}
                            </div>
                            <div className="col-6 mb-3">
                                <Form.Select aria-label="Default select example">
                                    <option>Status Type</option>
                                    {Object.entries(Status_type).map(data => (
                                        <option value={data[1].ID} selected={State_Select == data[1].ID}>{data[1].Detail}</option>
                                    ))}
                                </Form.Select>
                                {/* <MDBInput label='Status Type' id='typeText' type='text' value={Status_type} placeholder='Active or Inactive'
                                onInput={e => setStatus_type(e.target.value)} /> */}
                            </div>
                            <div className="d-flex justify-content-center mb-2">
                                <MDBBtn onClick={handleSend}>Change</MDBBtn>
                            </div>
                        </div>
                    </Card>
                </Row>
            </Container>
        );
    }
}