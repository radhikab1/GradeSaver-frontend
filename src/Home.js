import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import { AddAssignmentModal } from './AddAssignmentModal';
import { EditAssignmentModal } from './EditAssignmentModal';

export class Home extends Component{

    constructor(props){
        super(props);
        this.state={assignments:[], addModalShow:false, editModalShow: false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'assignment')
        .then(response=>response.json())
        .then(data=>{
            this.setState({assignments:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteAssignment(assignmentid){
        if(window.confirm('Are you sure you want to delete the assignment?')){
            fetch(process.env.REACT_APP_API+'assignment/'+assignmentid, {
                method: 'DELETE',
                header:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    render(){
        const {assignments, assignmentid, coursename, assignmentname, assignmentgrade, submissiondate}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div className="home">
                <Table border hover>
                    <thead>
                        <tr>
                            <th>Assignment Id</th>
                            <th>Course Name</th>
                            <th>Assignment Name</th>
                            <th>Grade (%)</th>
                            <th>Submission Date</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.map(assignment=>
                            <tr key={assignment.AssignmentId}>
                                <td>{assignment.AssignmentId}</td>
                                <td>{assignment.CourseName}</td>
                                <td>{assignment.AssignmentName}</td>
                                <td>{assignment.AssignmentGrade}</td>
                                <td>{assignment.SubmissionDate}</td>
                                <td>
                                <ButtonToolbar>
                                    <Button variant='info' onClick={()=>this.setState({editModalShow:true, assignmentid:assignment.AssignmentId, coursename:assignment.CourseName, assignmentname:assignment.AssignmentName, assignmentgrapde:assignment.AssignmentGrade, submissiondate:assignment.submissiondate})}>
                                        Edit
                                    </Button>

                                    <Button variant='danger' onClick={()=>this.deleteAssignment(assignment.AssignmentId)}>
                                        Delete
                                    </Button>
                                    <EditAssignmentModal show={this.state.editModalShow} onHide={editModalClose} assignmentid={assignmentid} coursename={coursename} assignmentname={assignmentname} assignmentgrade={assignmentgrade} submissiondate={submissiondate}/>
                                </ButtonToolbar>
                
                                </td>
                            </tr>
                            )}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary' onClick={()=>this.setState({addModalShow:true})}>
                        Add Assignment
                    </Button>

                    <AddAssignmentModal show={this.state.addModalShow} onHide={addModalClose}/>
                </ButtonToolbar>
                
            </div>
        )
    }
}