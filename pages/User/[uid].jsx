import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const getStaticPaths = async () => {
    const res = await fetch('http://localhost:8000/data_user')
    const data = await res.json()
    
    const paths = data.map(User => {
        return {
            params: {uid : User.Employee_ID.toString() }
        }
    })

    return {
        paths,
        fallback: false
    }
    
}


export const getStaticProps = async (context) => {
    const uid = context.params.uid;
    const res = await fetch('http://localhost:8000/User/'+uid);
    const data = await res.json();

    return {
        props: {data_user: data}
    }
}



const Detail_user = ({data_user}) => {
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
                            value={data_user[0].Employee_ID}
                            />
                        </span>
                        </div>
                        <div >
                        <label  className="control-label d-inline-block text-right">ชื่อ: </label>&nbsp;&nbsp;
                        <input 
                        type="text"
                        className="px-0 bg-white border-0"
                        disabled 
                        value={data_user[0].Name}
                        />
                        </div>
                        <div >
                        <label  className="control-label d-inline-block text-right">วัน/เวลา: </label>&nbsp;&nbsp;
                        <input 
                        type="text"
                        className="px-0 bg-white border-0"
                        disabled 
                        value={data_user[1]}
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
