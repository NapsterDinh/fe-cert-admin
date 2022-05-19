import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Breadcrumb,
    Form,
    Row, Col, InputGroup, Card
} from "@themesberg/react-bootstrap";
import {
    faHome,
    faSave,
    faAngleDoubleRight
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router-dom';

//components
import TransferQuestions from 'app/base/components/TransferQuestions';
import { openNotificationWithIcon } from "app/base/components/Notification";
import ModalAddNewExam from '../ModalAddNewExam/ModalNewExam';
//data
import { Routes } from "app/routes";
import { defaultExamContent } from 'app/data/exam'
import { questionData } from 'app/data/questions'


const NewExamPage = () => {
    const [data, setData] = useState([])
    const [show, setShow] = useState(false);
    const [questions, setQuestions] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let { idExam } = useParams()
    console.log(idExam);

    const handleSaveExam = (e) => {
        e.preventDefault()
        const exam = {
            title: e.target.title.value.trim(),
            description: e.target.description.value.trim(),
            time: e.target.time.value.trim(),
            content: e.target.content.value.trim(),
            isPublic: e.target.isPublic[0].checked ? 'Public' : 'Private',
            isSessionMorning: e.target.isSessionMorning[0].checked,
            eventDate: e.target.eventDate.value.trim(),
            location: e.target.location.value.trim(),
            totalQuestions: e.target.totalQuestions.value.trim(),
            maxTotalTests: e.target.maxTotalTests.value.trim(),
            hasShowTestResult: e.target.hasShowTestResult.checked,
            hasShowRightAnswer: e.target.hasShowRightAnswer.checked,
            showRanking: e.target.showRanking.checked,
            questions
        }
        if (exam.title === '' ||
            exam.description === '' ||
            exam.time === '' ||
            exam.content === '' ||
            exam.eventDate === '' ||
            exam.location === '' ||
            exam.totalQuestions === '' ||
            exam.maxTotalTests === '' ||
            exam.questions.length !== +exam.totalQuestions
        ) {
            //not fill all field
            console.log(exam);
            openNotificationWithIcon('error', 'You need to fill all of field')
        }
        else {
            //submit
            console.log(exam);
            openNotificationWithIcon('success', 'A new exam has been created')
        }
    }

    const handleCancelAddNewEdit = () => {

    }
    return (
        <>
            <ModalAddNewExam show={show} handleClose={handleClose} handleSubmit={handleCancelAddNewEdit} />
            <Form onSubmit={handleSaveExam}>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                    <div className="d-block mb-4 mb-md-0">
                        <Breadcrumb
                            className="d-none d-md-inline-block"
                            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
                        >
                            <Breadcrumb.Item>
                                <FontAwesomeIcon icon={faHome} />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item onClick={() => window.location = '/exam-management'}>{Routes.ExamPage.name}</Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <FontAwesomeIcon icon={faAngleDoubleRight} />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>{`Create a new Exam`}</Breadcrumb.Item>
                        </Breadcrumb>
                        <h4>{`Create a new Exam`}</h4>
                        <p className="mb-0">
                            Below tables will shown all of course in your website and some
                            information about them.
                        </p>
                    </div>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <Button className="mx-2" type="submit">
                            <FontAwesomeIcon icon={faSave} className="me-2" />
                            Save Exam
                        </Button>
                        <Button variant="outline-primary" className="mx-2" onClick={handleShow}>
                            Cancel
                        </Button>
                    </div>
                </div>

                <div className="table-settings mb-4 ">
                    <Card border="light" className="table-wrapper table-responsive shadow-sm">
                        <Card.Body className="pt-0 my-4">
                            <Row>
                                <Col lg={7}>
                                    <Form.Group
                                        className={"form-group mb-3"}
                                        as={Col} controlId="formTitle">
                                        <Form.Label>Title</Form.Label>
                                        <InputGroup
                                        >
                                            <Form.Control
                                                name="title"
                                                type='text' />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group
                                        className={"form-group error mb-3"}
                                        controlId="formDescription">
                                        <Form.Label>Description</Form.Label>
                                        <InputGroup
                                        >
                                            <Form.Control
                                                name="description"
                                                as="textarea" rows={5} />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group
                                        className={"form-group error mb-3"}
                                        controlId="formDescription">
                                        <Form.Label>Content</Form.Label>
                                        <InputGroup
                                        >
                                            <Form.Control
                                                name="content"
                                                defaultValue={defaultExamContent}
                                                as="textarea" rows={10} />
                                        </InputGroup>
                                    </Form.Group>
                                    <div className='d-flex justify-content-between'>
                                        <Form.Group
                                            style={{ flex: '0 0 40%' }}
                                            className="mb-3" controlId="formDescription">
                                            <Form.Label>Topic</Form.Label>
                                            <Form.Select aria-label="Default select example">
                                                <option>Open this select menu</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group
                                            style={{ flex: '0 0 40%' }}
                                            className="mb-3" controlId="formDescription">
                                            <Form.Label>Exam</Form.Label>
                                            <Form.Select aria-label="Default select example">
                                                <option>Open this select menu</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </div>
                                </Col>
                                <Col lg={4} className='mx-5'>
                                    <Form.Group
                                        className={"form-group mb-3 d-flex"}
                                        as={Col} controlId="formTitle">
                                        <div>
                                            <Form.Label>Time(s)</Form.Label>
                                            <InputGroup
                                            >
                                                <Form.Control
                                                    name="time"
                                                    defaultValue={900}
                                                    type='text' />
                                            </InputGroup>
                                        </div>

                                        <div className='mx-4'>
                                            <Form.Label>Total Questions</Form.Label>
                                            <InputGroup
                                            >
                                                <Form.Control
                                                    name="totalQuestions"
                                                    defaultValue={80}
                                                    type='text' />
                                            </InputGroup>
                                        </div>
                                    </Form.Group>
                                    <Form.Group
                                        className={"form-group mb-3 d-flex"}
                                        as={Col} controlId="formTitle">
                                        <div>
                                            <Form.Label>Session</Form.Label>
                                            <div key={`inline-radio`} className="mb-3">
                                                <Form.Check
                                                    inline
                                                    label="Morning"
                                                    name='isSessionMorning'
                                                    defaultChecked
                                                    type='radio'
                                                    id={`inline-radio-9`}
                                                />
                                                <Form.Check
                                                    inline
                                                    label="Afternoon"
                                                    name='isSessionMorning'
                                                    type='radio'
                                                    id={`inline-radio-10`}
                                                />
                                            </div>
                                        </div>
                                    </Form.Group>
                                    <Form.Group
                                        className={"form-group mb-3 d-flex"}
                                        as={Col} controlId="formTitle">
                                        <div className='mr-3'>
                                            <Form.Label>Event Location</Form.Label>
                                            <InputGroup
                                            >
                                                <Form.Control
                                                    name='location'
                                                    type='text' />
                                            </InputGroup>
                                        </div>

                                        <div className='mx-4'>
                                            <Form.Label>Event date</Form.Label>
                                            <InputGroup
                                            >
                                                <Form.Control
                                                    name="eventDate"
                                                    type='date' />
                                            </InputGroup>
                                        </div>
                                    </Form.Group>
                                    <Form.Group
                                        className={"form-group mb-3 d-flex"}
                                        as={Col} controlId="formTitle">
                                        <div className='mr-3'>
                                            <Form.Label>Max total test per user</Form.Label>
                                            <InputGroup
                                            >
                                                <Form.Control
                                                    name='maxTotalTests'
                                                    defaultValue={100}
                                                    type='text' />
                                            </InputGroup>
                                        </div>
                                    </Form.Group>
                                    <Form.Group
                                        className={"form-group mb-3 d-flex mt-3"}
                                        as={Col} controlId="formTitle">
                                        <div key={`inline-checkbox1`} className="mb-3">
                                            <Form.Check
                                                inline
                                                label="Show right Answer"
                                                name='hasShowRightAnswer'
                                                defaultChecked
                                                type='checkbox'
                                                id={`inline-radio-1`}
                                            />
                                        </div>
                                        <div key={`inline-checkbox2`} className="mb-3">
                                            <Form.Check
                                                inline
                                                label="Show Result After Submit"
                                                defaultChecked
                                                name='hasShowTestResult'
                                                type='checkbox'
                                                id={`inline-radio-11`}
                                            />
                                        </div>
                                        <div key={`inline-checkbox3`} className="mb-3">
                                            <Form.Check
                                                inline
                                                label="Show Ranking"
                                                defaultChecked
                                                name='showRanking'
                                                type='checkbox'
                                                id={`inline-radio-13`}
                                            />
                                        </div>
                                    </Form.Group>
                                    <Form.Group
                                        className={"form-group mb-3 d-flex"}
                                        as={Col} controlId="formTitle">
                                        <div>
                                            <Form.Label>Status</Form.Label>
                                            <div key={`inline-radio-status`} className="mb-3">
                                                <Form.Check
                                                    inline
                                                    label="Public"
                                                    name='isPublic'
                                                    defaultChecked
                                                    type='radio'
                                                    id={`inline-radio-3`}
                                                />
                                                <Form.Check
                                                    inline
                                                    name='isPublic'
                                                    label="Private"
                                                    type='radio'
                                                    id={`inline-radio-4`}
                                                />
                                            </div>
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Form.Group className="mb-3" controlId="formDescription">
                                    <Form.Label>Question List</Form.Label>
                                    <TransferQuestions
                                        questions={questions}
                                        setQuestions={setQuestions}
                                        data={questionData.map((item) => (
                                            {
                                                ...item,
                                                key: item.id,
                                                id: undefined
                                            }
                                        ))} />
                                </Form.Group>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            </Form>
        </>
    );
}

export default NewExamPage;