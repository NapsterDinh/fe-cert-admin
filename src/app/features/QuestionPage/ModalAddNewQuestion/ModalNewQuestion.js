import React, { useState } from 'react';
import { Modal, Button, Form, Col, Row, InputGroup } from "@themesberg/react-bootstrap";
import './ModalNewQuestion.css'
import { addNewQuestion } from 'app/core/apis/question';


const ModalAddNewQuestion = ({ show, handleClose, item,fetchQuestionList }) => {
    const [question, setQuestion] = useState(item !== '' && item !== null ? item?.question : '')
    const [explanation, setExplanation] = useState(item !== '' && item !== null ? item?.explanation : '')
    const [type, setType] = useState(item !== '' && item !== null ? item?.type : 'single_choice')
    const [choices, setChoices] = useState(item !== '' && item !== null ? item?.choices : [
        {
            id: '1',
            label: ''
        },
        {
            id: '2',
            label: ''
        },
        {
            id: '3',
            label: ''
        },
        {
            id: '4',
            label: ''
        },
    ])
    const [rightAnswer, setRightAnswer] = useState(item !== '' && item !== null ? item?.answer : '')

    const handleAddNewQuestion = async (e) => {
        e.preventDefault()
        try {
            const response = await addNewQuestion({
                question: question,
                explanation: explanation,
                type: type,
                choices: choices,
                answer: rightAnswer
            })
            if (response.status === 201) {
                await fetchQuestionList()
                handleClose()
            }
        } catch (error) {

        }
    }

    const handleSelectAnswer = (e, index) => {
        if (e.target.checked) {
            setRightAnswer(choices[index])
        }
    }

    const handleChangeLabelAnswer = (e, index) => {
        let temp = [...choices]
        temp.splice(index, 1, {
            ...temp[index],
            label: e.target.value.trim()
        })
        setChoices(temp)
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} className='modal-question'>
                <Form noValidate onSubmit={handleAddNewQuestion}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Question</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col lg={8}>
                                <Form.Group
                                    className={"form-group mb-3"}
                                    as={Col} controlId="formTitle">
                                    <Form.Label>Question</Form.Label>
                                    <InputGroup
                                    >
                                        <Form.Control
                                            defaultValue={question}
                                            value={question}
                                            onChange={(e) => setQuestion(e.target.value.trim())}
                                            as="textarea" rows={3} placeholder="Enter question" />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group
                                    className={"form-group error mb-3"}
                                    controlId="formDescription">
                                    <Form.Label>Explanation(Optional)</Form.Label>
                                    <InputGroup
                                    >
                                        <Form.Control
                                            defaultValue={explanation}
                                            value={explanation}
                                            onChange={(e) => setExplanation(e.target.value.trim())}
                                            as="textarea" rows={3} placeholder="Enter explanation" />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Label>Answer</Form.Label>
                                <Form.Group className="mb-3 d-flex" controlId="formDescription">
                                    <Form.Check
                                        inline
                                        onChange={(e) => handleSelectAnswer(e, 0)}
                                        name="group1"
                                        type='radio'
                                        id={`inline-1`}
                                    />
                                    <Form.Control
                                        defaultValue={choices[0]?.label}
                                        onChange={(e) => handleChangeLabelAnswer(e, 0)}
                                        as="textarea" rows={2} placeholder="Answer A" />
                                </Form.Group>
                                <Form.Group className="mb-3 d-flex" controlId="formDescription">
                                    <Form.Check
                                        inline
                                        onChange={(e) => handleSelectAnswer(e, 1)}
                                        name="group1"
                                        type='radio'
                                        id={`inline-2`}
                                    />
                                    <Form.Control
                                    defaultValue={choices[1]?.label}
                                        onChange={(e) => handleChangeLabelAnswer(e, 1)}
                                        as="textarea" rows={2} placeholder="Answer B" />
                                </Form.Group>
                                <Form.Group className="mb-3 d-flex" controlId="formDescription">
                                    <Form.Check
                                        onChange={(e) => handleSelectAnswer(e, 2)}
                                        inline
                                        name="group1"
                                        type='radio'
                                        id={`inline-3`}
                                    />
                                    <Form.Control
                                    defaultValue={choices[2]?.label}
                                        onChange={(e) => handleChangeLabelAnswer(e, 2)}
                                        as="textarea" rows={2} placeholder="Answer C" />
                                </Form.Group>
                                <Form.Group className="mb-3 d-flex" controlId="formDescription">
                                    <Form.Check
                                        onChange={(e) => handleSelectAnswer(e, 3)}
                                        inline
                                        name="group1"
                                        type='radio'
                                        id={`inline-4`}
                                    />
                                    <Form.Control
                                    defaultValue={choices[3]?.label}
                                        onChange={(e) => handleChangeLabelAnswer(e, 3)}
                                        as="textarea" rows={2} placeholder="Answer D" />
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group className="mb-3" controlId="formDescription">
                                    <Form.Label>Topic</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option>Open this select menu</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formDescription">
                                    <Form.Label>Exam</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option>Open this select menu</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </Form.Group>

                            </Col>
                        </Row>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default ModalAddNewQuestion;