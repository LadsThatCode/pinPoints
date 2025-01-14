import React from 'react';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'

class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.locationToBeUpdated?._id,
      v: this.props.locationToBeUpdated?.__v,
      city: this.props.locationToBeUpdated?.name,
      lat: this.props.locationToBeUpdated?.lat,
      lng: this.props.locationToBeUpdated?.lng,
      method: this.props.locationToBeUpdated ? 'put' : 'post',
    }
  }

  handleFormSubit = (event) => {
    console.log(event);
    event.preventDefault();
    let locationObj = {
      city: event.target.name.value,
      lat: event.target.lat.value,
      lng: event.target.lon.value,
    
    }
    console.log(this.state.method)
    if (this.state.method === 'put') {
      console.log('put method')
      this.props.updateLocation(locationObj)
    } else {
      console.log('else block')
      this.props.postLocation(locationObj);
    }
    this.props.handleCloseModal();
  }



  render() {
    return <Modal
    id='modal'
      show={this.props.showModal}
      onHide={this.props.handleCloseModal}

    >
      <Modal.Header>
        {/* <h2>{this.state.formTitle}</h2> */}
      </Modal.Header>
      <Modal.Body>

        <Form onSubmit={ this.handleFormSubit}>
          
          <Form.Group controlId="name">
            <Form.Label>Name of Location</Form.Label>
            <Form.Control type='text' placeholder="Enter Location Name" ></Form.Control>
          </Form.Group>

          <Form.Group controlId="lat">
            <Form.Label>Latitude</Form.Label>
            <Form.Control type='text' placeholder="Example 00.0000" ></Form.Control>
          </Form.Group>

          <Form.Group controlId="lon">
            <Form.Label>Longitude </Form.Label>
            <Form.Control type='text' placeholder="Example: 00.0000" ></Form.Control>
          </Form.Group>

          <Button type="submit">submit</Button>
        </Form>

      </Modal.Body>

      <Modal.Footer>
        <Button return false type='submit' variant='primary' onClick={this.props.handleCloseModal}>Exit</Button>
      </Modal.Footer>

    </Modal>
  }

}

export default LocationForm
