import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import React, { Component } from "react";
import Link from "next/link";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit';
import { useSession } from "next-auth/react"
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';

const withSession = (Component) => (props) => {
  const session = useSession()

  // if the component has a render property, we are good
  if (Component.prototype.render) {
    return <Component session={session} {...props} />
  }

  // if the passed component is a function component, there is no need for this wrapper
  throw new Error(
    [
      "You passed a function component, `withSession` is not needed.",
      "You can `useSession` directly in your component.",
    ].join("\n")
  )
}

class ExcelUpload extends Component {
  state = {
    file: null,
    uploadPercentage: 0,

  };

  handleFile(e) {
    let file = e.target.files[0];

    this.setState({ file: file });
  }

  handleUpload(e) {
    let file = this.state.file;

    let formdata = new FormData();
    formdata.append("file", file);

    const option = {
      onUploadProgress: (ProgressEvent) => {
        const {loaded, total} = ProgressEvent;
        let percent = Math.floor( (loaded *100) / total )

        if(percent < 100){
          this.setState ({uploadPercentage: percent})
        }
      }
    }
    axios.post("http://127.0.0.1:8000/upload/file/", formdata, option, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(res => {
      this.setState ({file: res.data.url, uploadPercentage: 100}, ()=>{
        setTimeout(() =>{
          this.setState ({uploadPercentage: 100})
        }, 1000)
      })
    });
  }

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleChangevisitor = event => {
    this.setState({ value2: event.target.value });
  };

  render() {

    const { data: session, status } = this.props.session
    const {uploadPercentage} = this.state;
    const Employee_ID = this.state.value
    const Detail = this.state.value2
  
    function handleSend() {
      axios.post("http://127.0.0.1:8000/insertOnce_gen", {
          "Employee_ID": Employee_ID
        })
      }

    function handleSendVisitor() {
      axios.post("http://127.0.0.1:8000/insertOnce_gen_visitor", {
          "Employee_ID": Detail
        })
      }
    // if(session){
      return (
        <div className="container">
          <Row >
            <Card className="col-7 px-0">
              <Card.Img variant="top" src="/qr.png"  />
            </Card>
            <div className='px-3 py-2 border border-5 border-danger  rounded col-5'>
              <div className='row'>
                <div class="h4 pb-2 mb-3 text-danger border-bottom border-danger">
                  Input Generate For Visitor
                </div>
                <div className="col-12">
                <MDBInput  label='Detail' id='typeText' type='text' placeholder='รายละเอียด' value={this.state.value2} onChange={this.handleChangevisitor}/>
                </div>
                <div className='row '>
                  <div className="col-12 mt-3 p-0 d-flex justify-content-center">
                  <MDBBtn className="col-5 mx-1  p-0" outline color='danger' onClick={handleSendVisitor}>Generate QRCode</MDBBtn>
                  <Link className="col-5 mx-1 p-0" href={`http://127.0.0.1:8000/downloadOnce_gen/${this.state.value2}`}>
                    <MDBBtn outline color='success'>Download</MDBBtn>
                  </Link>
                  </div>
                </div>
                <div class="h4 pb-2 mb-3 mt-2 text-danger border-bottom border-danger">
                  Input Generate For Employee
                </div>
                <div className="col-12">
                <MDBInput label='Employee ID' id='typeText' type='text' placeholder='Employee ID' value={this.state.value} onChange={this.handleChange}/>
                </div>
                <div className="row">
                  <div className="col-12 mt-3 p-0 d-flex justify-content-center">
                    <MDBBtn outline className="col-5 mx-1  p-0" color='danger' onClick={handleSend}>Generate QRCode</MDBBtn>
                    <Link className="col-5 mx-1 p-0" href={`http://127.0.0.1:8000/downloadOnce_gen/${this.state.value}`}>
                      <MDBBtn outline color='success'>Download</MDBBtn>
                    </Link>
                  </div>
                </div>
                <div class="h4 pb-2 mt-2 mb-3 text-danger border-bottom border-danger">
                  Upload Generate
                </div>
                <div className='row'>
                  <div className='col-7 d-flex align-items-center'>
                    <Form.Group controlId="formFileSm" className="d-flex align-items-start">
                      <Form.Label></Form.Label>
                      <Form.Control
                        type="file"
                        size="md"
                        name="file"
                        onChange={(e) => this.handleFile(e)}
                      />
                    </Form.Group>
                  </div>
                  <div className='col-5 px-0 d-flex align-items-start'>
                    <MDBBtn
                      outline className='mx-2' color='danger'
                      onClick={(e) => this.handleUpload(e)}
                    >
                      Generate QRCode
                    </MDBBtn>
                  </div>
                  <div className='col-12 mt-2 pe-0'>
                    <MDBProgress height='20'>
                      <MDBProgressBar striped bgColor='danger' animated width={uploadPercentage} valuemin={0} valuemax={100}>
                        {uploadPercentage}%
                      </MDBProgressBar>
                    </MDBProgress>
                  </div>
                  <div className='col-12 mt-3 d-flex justify-content-center'>
                    {uploadPercentage == 100 && 
                    <Link href="http://127.0.0.1:8000/export_excel">
                      <Button variant="outline-success" type="button">
                        Download QR-CODE
                      </Button>
                    </Link>
                    }
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </div>
      );
    }
  }
//}

const ClassComponentWithSession = withSession(ExcelUpload)
export default ClassComponentWithSession