import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class EditAssignmentModal extends Component{
    constructor(props) {
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'assignment/', {
            method:'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                AssignmentId: event.target.AssignmentId.value,
                CourseName: event.target.CourseName.value,
                AssignmentName: event.target.AssignmentName.value,
                AssignmentGrade: event.target.AssignmentGrade.value,
                SubmissionDate:  event.target.SubmissionDate.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }

    render(){
        return (
            <div>
                <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" center>
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">Edit Assignment</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="AssignmentId">
                                        <Form.Label>AssignmentId</Form.Label>
                                        <Form.Control type="text" name="AssignmentId" disabled placeholder="AssignmentId" defaultValue={this.props.assignmentid}></Form.Control>
                                    </Form.Group>
                                    
                                    <Form.Group controlId="CourseName">
                                        <Form.Label>CourseName</Form.Label>
                                        <Form.Control type="text" name="CourseName" required placeholder="CourseName" defaultValue={this.props.coursename}></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="AssignmentName">
                                        <Form.Label>AssignmentName</Form.Label>
                                        <Form.Control type="text" name="AssignmentName" required placeholder="AssignmentName" defaultValue={this.props.assignmentname}></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="AssignmentGrade">
                                        <Form.Label>AssignmentGrade</Form.Label>
                                        <Form.Control type="text" name="AssignmentGrade" required placeholder="AssignmentGrade" defaultValue={this.props.assignmentgrade}></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="SubmissionDate">
                                        <Form.Label>SubmissionDate</Form.Label>
                                        <Form.Control type="date" name="SubmissionDate" required placeholder="SubmissionDate" defaultValue={this.props.submissiondate}></Form.Control>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">Update Assignment</Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}