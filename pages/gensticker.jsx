import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import React, { Component } from "react";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { MDBProgress, MDBProgressBar } from "mdb-react-ui-kit";
import { useSession } from "next-auth/react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";

const withSession = (Component) => (props) => {
  const session = useSession();

  if (Component.prototype.render) {
    return <Component session={session} {...props} />;
  }
  throw new Error(
    [
      "You passed a function component, `withSession` is not needed.",
      "You can `useSession` directly in your component.",
    ].join("\n")
  );
};

class ExcelUpload extends Component {
  state = {
    file: null,
    uploadPercentage: 0,
    showing: false,
    showing2: false,
    UploadError: null,
    genVisitorError: null,
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
        const { loaded, total } = ProgressEvent;
        let percent = Math.floor((loaded * 100) / total);

        if (percent < 100) {
          this.setState({ uploadPercentage: percent });
        }
      },
    };
    axios
      .post("http://127.0.0.1:8000/upload/file/", formdata, option, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        this.setState({ file: res.data.url, uploadPercentage: 100 }, () => {
          setTimeout(() => {
            this.setState({ uploadPercentage: 100 });
          }, 1000);
        });
      }).catch((error) => {
        this.setState({ UploadError: error.response.status });
      });
  }

  constructor(props) {
    super(props);
    this.state = { value: "",
                  value4: "",
                  value2: "",
                  value3: ""};
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleChangevisitorName = (event) => {
    this.setState({ value3: event.target.value });
  };
  handleChangevisitorDetail = (event) => {
    this.setState({ value2: event.target.value });
  };
  handleChangevisitorCarRegis = (event) => {
    this.setState({ value4: event.target.value });
  };

  render() {
    const { data: session, status } = this.props.session;
    const { uploadPercentage } = this.state;
    const Employee_ID = this.state.value;
    const Detail = this.state.value2;
    const Name = this.state.value3
    const car_regis = this.state.value4
    const { showing } = this.state;
    const { showing2 } = this.state;
    const { UploadError } = this.state;

    function handleSend() {
      axios.post("http://127.0.0.1:8000/insertOnce_gen", {
        Employee_ID: Employee_ID,
      });
    }

    function handleSendVisitor() {
      axios.post("http://127.0.0.1:8000/insertOnce_gen_visitor", {
        Name: Name,
        Detail: Detail,
        car_regis: car_regis,
      });
      
    }

    if (session) {
      return (
        <div className="container">
          <Row>
            <div className="col-7 px-0">
              <Card className="px-0">
                <Card.Img variant="top" src="/qr.png" />
              </Card>
            </div>
            <div className="col-5">
              <div className="px-3 py-2 border border-5 border-danger  rounded ">
                <div className="row">
                  <div className="h4 pb-2 mb-3 text-danger border-bottom border-danger">
                    Input Generate For Visitor
                  </div>
                  <div className="">
                    <MDBInput
                      className="mb-2"
                      label="Name"
                      id="typeText"
                      type="text"
                      placeholder="ชื่อ-นามสกุล"
                      required
                      value={this.state.value3}
                      onChange={this.handleChangevisitorName}
                    />
                    <MDBInput
                      className="mb-2"
                      label="Car registration"
                      id="typeText"
                      type="text"
                      placeholder="ทะเบียนรถ"
                      required
                      value={this.state.value4}
                      onChange={this.handleChangevisitorCarRegis}
                    />
                    <MDBInput
                      label="Detail"
                      id="typeText"
                      type="text"
                      placeholder="รายละเอียด"
                      required
                      value={this.state.value2}
                      onChange={this.handleChangevisitorDetail}
                    />
                  </div>
                  <div className="row ">
                    <div className="col-12 mt-3 p-0 d-flex justify-content-center">
                      {this.state.value4 != '' && this.state.value2 != '' && this.state.value3 != '' && 
                        (<MDBBtn
                          className="col-5 mx-1  p-0"
                          outline
                          color="danger"
                          onClick={handleSendVisitor}
                          onMouseDown={() => this.setState({ showing: !showing })}
                        >
                          Generate QRCode
                        </MDBBtn>)}
                      {showing ? <Link
                        className="col-5 mx-1 p-0"
                        href={`http://127.0.0.1:8000/downloadOnce_gen/${this.state.value2}`}
                      >
                        <MDBBtn outline color="success">
                          Download
                        </MDBBtn>
                      </Link> : null}
                    </div>
                  </div>
                </div>
                <div className="h4 pb-2 mb-3 mt-2 text-danger border-bottom border-danger">
                  Input Generate For Employee
                </div>
                <div className="col-12">
                  <MDBInput
                    label="Employee ID"
                    id="typeText"
                    type="text"
                    placeholder="รหัสพนักงาน"
                    required
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="row">
                  <div className="col-12 mt-3 p-0 d-flex justify-content-center">
                    {this.state.value != '' && (<MDBBtn
                      outline
                      className="col-5 mx-1  p-0"
                      color="danger"
                      onClick={handleSend}
                      onMouseDown={() => this.setState({ showing2: !showing2 })}
                    >
                      Generate QRCode
                    </MDBBtn>)}
                    {showing2 ? <Link
                      className="col-5 mx-1 p-0"
                      href={`http://127.0.0.1:8000/downloadOnce_gen/${this.state.value}`}
                    >
                      <MDBBtn outline color="success">
                        Download
                      </MDBBtn>
                    </Link> : null}
                  </div>
                </div>
                <div className="h4 pb-2 mt-2 mb-3 text-danger border-bottom border-danger">
                  Upload Generate
                </div>
                <div className="row">
                  <div className="col-7 d-flex align-items-center">
                    <Form.Group
                      controlId="formFileSm"
                      className="d-flex align-items-start"
                    >
                      <Form.Label></Form.Label>
                      <Form.Control
                        type="file"
                        size="md"
                        name="file"
                        onChange={(e) => this.handleFile(e)}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-5 px-0 d-flex align-items-start">
                    <MDBBtn
                      outline
                      className="mx-2"
                      color="danger"
                      onClick={(e) => this.handleUpload(e)}
                    >
                      Generate QRCode
                    </MDBBtn>
                  </div>
                  {UploadError == 422 &&
                    (
                      <div className="text-danger">
                        No file upload for generate
                      </div>
                    )
                  }
                  <div className="col-12 mt-2 pe-0">
                    <MDBProgress height="20">
                      <MDBProgressBar
                        striped
                        bgColor="danger"
                        animated
                        width={uploadPercentage}
                        valuemin={0}
                        valuemax={100}
                      >
                        {uploadPercentage}%
                      </MDBProgressBar>
                    </MDBProgress>
                  </div>
                  <div className="col-12 mt-3 d-flex justify-content-center">
                    {uploadPercentage == 100 && (
                      <Link href="http://127.0.0.1:8000/export_excel">
                        <Button variant="outline-success" type="button">
                          Download QR-CODE
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Row >
        </div>
      );
    }
  }
}

const ClassComponentWithSession = withSession(ExcelUpload);
export default ClassComponentWithSession;
