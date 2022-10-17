import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from "next-auth/react"
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function addUser() {
    const MySwal = withReactContent(Swal)
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
    const [Status_type, setStatus_type] = useState('');
    const [Agency_Select, setAgency_Select] = useState('');
    const [Type_vehicle_Select, setType_vehicle_Select] = useState('');
    const [Zone_Select, setZone_Select] = useState('');
    const [Status_type_Select, setStatus_type_Select] = useState('');
    const [Company_Select, setCompany_Select] = useState('');
    const [Company_dormitory_Select, setCompany_dormitory_Select] = useState('');

    useEffect(() => {
        (async () => {
            await axios.get("http://localhost:8000/agency").then((response) => {
                setAgency(response.data)
            })
            await axios.get("http://localhost:8000/type_vehicle").then((response) => {
                setType_vehicle(response.data)
            })
            await axios.get("http://localhost:8000/zone").then((response) => {
                setZone(response.data)
            })
            await axios.get("http://localhost:8000/status_detail").then((response) => {
                setStatus_type(response.data)
            })
            await axios.get("http://localhost:8000/company").then((response) => {
                setCompany(response.data)
            })
            await axios.get("http://localhost:8000/company_dormitory").then((response) => {
                setCompany_dormitory(response.data)
            })
        })();
    }, [])

    function handleSend() {
        axios.post("http://127.0.0.1:8000/insertOnce", {
            "Employee_ID": Employee_ID,
            "Name": Name,
            "Phone": Phone,
            "Agency": Agency_Select,
            "Company": Company_Select,
            "Company_dormitory": Company_dormitory_Select,
            "CarRegis": CarRegis,
            "Type_vehicle": Type_vehicle_Select,
            "Zone": Zone_Select,
            "Status_type": Status_type_Select
        }).then(
            MySwal.fire({
                title: <p>Hello World</p>,
                didOpen: () => {
                  // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                  MySwal.showLoading()
                },
              }).then(() => {
                return MySwal.fire(<p>Shorthand works too</p>)
              })
        )
    }

    if (session) {
        return (
            <Container>
                <Row className="d-flex justify-content-center">
                    <Card className="col-sm-4 col-md-6 ">
                        <Card.Header className="row bg-info text-white">Add User</Card.Header>
                        <div className="row p-2">
                            <div className="mb-3">
                                <MDBInput label='Employee ID' id='typeText' type='text' placeholder='รหัสพนักงาน'
                                    value={Employee_ID} onInput={e => setEmployee_ID(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <MDBInput label='Name' id='typeText' type='text' placeholder='ชื่อ-นามสกุล'
                                    value={Name} onInput={e => setName(e.target.value)} />
                            </div>
                            <div className="col-6 mb-3">
                                <MDBInput label='Phone' id='typePhone' type='tel' placeholder='เบอร์โทรศัพท์ (ไม่ต้องมี 0 ด้านหน้า)'
                                    value={Phone} onInput={e => setPhone(e.target.value)} />
                            </div>
                            <div className="col-6 mb-3">
                                <MDBInput label='Car Registration' id='typeText' type='text' placeholder='ทะเบียนรถ'
                                    value={CarRegis} onInput={e => setCarRegis(e.target.value)} />
                            </div>
                            <div className="col-6 mb-3">
                                <Form.Select aria-label="Default select example" value={Agency_Select} onChange={e => {
                                    setAgency_Select(e.target.value);
                                }}>
                                    <option disabled selected>Agency</option>
                                    {Object.entries(Agency).map(data => (
                                        <option value={data[1].ID}>{data[1].Detail}</option>
                                    ))}
                                </Form.Select>
                                {/* <MDBInput label='Agency' id='typeText' type='text' placeholder='แผนก'
                                    value={Agency} onInput={e => setAgency(e.target.value)} /> */}
                            </div>
                            <div className="col-6 mb-3">
                                <Form.Select aria-label="Default select example" value={Company_Select} onChange={e => {
                                    setCompany_Select(e.target.value);
                                }}>
                                    <option disabled selected>Company</option>
                                    {Object.entries(Company).map(data => (
                                        <option value={data[1].ID}>{data[1].Detail}</option>
                                    ))}
                                </Form.Select>
                                {/* <MDBInput label='Company' id='typeText' type='text' placeholder='TOG หรือ TOC'
                                    value={Company} onInput={e => setCompany(e.target.value)} /> */}
                            </div>
                            <div className="col-6 mb-3">
                                <Form.Select aria-label="Default select example" value={Company_dormitory_Select} onChange={e => {
                                    setCompany_dormitory_Select(e.target.value);
                                }}>
                                    <option disabled selected>Company dormitory</option>
                                    {Object.entries(Company_dormitory).map(data => (
                                        <option value={data[1].ID}>{data[1].Detail}</option>
                                    ))}
                                </Form.Select>
                                {/* <MDBInput label='Company dormitory' id='typeText' type='text' placeholder='อยู่หอพักบริษัทหรือไม่'
                                    value={Company_dormitory} onInput={e => setCompany_dormitory(e.target.value)} /> */}
                            </div>

                            <div className="col-6 mb-3">
                                <Form.Select aria-label="Default select example" value={Type_vehicle_Select} onChange={e => {
                                    setType_vehicle_Select(e.target.value);
                                }}>
                                    <option disabled selected>Type vehicle</option>
                                    {Object.entries(Type_vehicle).map(data => (
                                        <option value={data[1].ID}>{data[1].Detail}</option>
                                    ))}
                                </Form.Select>
                                {/* <MDBInput label='Type vehicle' id='typeText' type='text' placeholder='รถจักรยานยนต์ หรือ รถยนต์'
                                    value={Type_vehicle} onInput={e => setType_vehicle(e.target.value)} /> */}
                            </div>
                            <div className="col-6 mb-3">
                                <Form.Select aria-label="Default select example" value={Zone_Select} onChange={e => {
                                    setZone_Select(e.target.value);
                                }}>
                                    <option disabled selected>Zone</option>
                                    {Object.entries(Zone).map(data => (
                                        <option value={data[1].ID}>{data[1].Detail}</option>
                                    ))}
                                </Form.Select>
                                {/* <MDBInput label='Zone' id='typeText' type='text' placeholder='A, B, C, D, A1, A2, A3, A4'
                                    value={Zone} onInput={e => setZone(e.target.value)} /> */}
                            </div>
                            <div className="col-6 mb-3">
                                <Form.Select aria-label="Default select example" value={Status_type_Select} onChange={e => {
                                    setStatus_type_Select(e.target.value);
                                }}>
                                    <option disabled selected>Status Type</option>Status_type
                                    {Object.entries(Status_type).map(data => (
                                        <option value={data[1].ID}>{data[1].Detail}</option>
                                    ))}
                                </Form.Select>
                                {/* <MDBInput label='Status Type' id='typeText' type='text' placeholder='Active or Inactive'
                                    value={Status_type} onInput={e => setStatus_type(e.target.value)} /> */}
                            </div>
                            <div className="d-flex justify-content-center mb-2">
                                <MDBBtn color='info' onClick={handleSend}>Add</MDBBtn>
                            </div>
                        </div>
                    </Card>
                </Row>
            </Container>
        )
    }
};
