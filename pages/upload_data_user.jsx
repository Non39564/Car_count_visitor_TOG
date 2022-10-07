import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import React, { Component } from "react";
import { MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import { useSession } from "next-auth/react"

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

class uploadData extends Component {
  state = {
    file: null,
    uploadPercentage: 0,
  }

  handleFile(e) {
    let file = e.target.files[0]

    this.setState({ file: file })
  }

  handleUpload(e) {
    let file = this.state.file;

    let formdata = new FormData();
    formdata.append("file", file);

    const option = {
      onUploadProgress: (ProgressEvent) => {
        const { loaded, total } = ProgressEvent;
        let percent = Math.floor((loaded * 100) / total)

        if (percent < 100) {
          this.setState({ uploadPercentage: percent })
        }
      }
    }

    axios.post("http://127.0.0.1:8000/upload_data_user/", formdata, option, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(res => {
      this.setState({ file: res.data.url, uploadPercentage: 100 }, () => {
        setTimeout(() => {
          this.setState({ uploadPercentage: 100 })
        }, 1000)
      })
    });
  }

  render() {
    const { uploadPercentage } = this.state;
    const { data: session, status } = this.props.session
    // if (session) {
      return (
        <Container >
          <Row className="d-flex justify-content-around mb-4">
            <Card className="col-6 px-0 mr-1 ">
              <Card.Img variant="top" src="/user_info.png" alt="Card image cap" />
            </Card>
            <Card className="col-6 px-0">
              <Card.Img className='col-12' variant="top" src="/data_user.png" />
            </Card>
          </Row>
          <Card className='card-body'>
            <Form.Group controlId="formFile" className="mb-0">
              <div class="h4 pb-2 mb-3 text-success border-bottom border-success">
                Upload file Excel
              </div>
              <div className='row'>
                <div className='col-4'>
                  <Form.Control className="mb-3" type="file" size="md" name="file" onChange={(e) => this.handleFile(e)} />
                </div>
                <div className='col-3'>
                  <Button variant="outline-success" type="button" onClick={(e) => this.handleUpload(e)}>Upload</Button>
                </div>
                <div className='col-3'>
                  {uploadPercentage == 100 &&
                    <Alert key="success" variant="success" className="text-center">
                      Upload Complete
                    </Alert>
                  }
                </div>
              </div>
            </Form.Group>
            <MDBProgress height='20'>
              <MDBProgressBar striped animated variant="success" width={uploadPercentage} valuemin={0} valuemax={100}>
                {uploadPercentage}%
              </MDBProgressBar>
            </MDBProgress>
            <br></br>
            
          </Card>
        </Container>
      )

    }
  }
//}

const uploadDataSession = withSession(uploadData)
export default uploadDataSession