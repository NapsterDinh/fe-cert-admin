import React, { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    ButtonGroup,
    Breadcrumb,
} from "@themesberg/react-bootstrap";
import {
    faHome,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
//components
import ModalAddNewQuestion from "./ModalAddNewQuestion/ModalNewQuestion";
import TablesQuestion from './TablesQuestion/TablesQuestion'
//data
import { Routes } from "app/routes";
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';

import { questionData } from 'app/data/questions';
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { getAllQuestions, getQuestionById, deleteQuestion } from 'app/core/apis/question';

const QuestionPage = () => {
    const [data, setData] = useState([])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [currentQuestion, setCurrentQuestion] = useState('')


    const deleteUserById = (id) => {
        console.log(data);
        let temp = [...data]
        const index = temp?.findIndex(item => item.id = id)
        temp.splice(index, 1)
        console.log(temp);
        setData(temp)
    }

    const deleteUser = React.useCallback(
        (id) => () => {
            console.log(data);
            (async () => {
                try {
                    const response = await deleteQuestion({
                        _id: id
                    })
                    if (response.status === 200) {
                        deleteUserById(id)
                    }
                } catch (error) {
                    alert(error)
                }
            })()
        },
        [],
    );

    const editQuestion = React.useCallback((id) => () => {
        (async () => {
            try {
                const response = await getQuestionById(id)
                if (response.status === 200) {
                    await setCurrentQuestion(response.data?.question[0]);
                    handleShow()
                }
            } catch (error) {
                alert(error)
            }
        })()
    }, [])


    const toggleAdmin = React.useCallback(
        (id) => () => {
            setData((prevRows) =>
                prevRows.map((row) =>
                    row.id === id ? { ...row, isAdmin: !row.isAdmin } : row,
                ),
            );
        },
        [],
    );

    const duplicateUser = React.useCallback(
        (id) => () => {
            setData((prevRows) => {
                const rowToDuplicate = prevRows.find((row) => row.id === id);
                return [...prevRows, { ...rowToDuplicate, id: Date.now() }];
            });
        },
        [],
    );

    const columns = React.useMemo(
        () => [
            {
                field: 'id',
                headerName: 'ID',
                type: 'string',
                align: 'left'
            },
            {
                field: 'type',
                type: 'string',
                headerName: 'Question Type',
            },
            {
                field: 'question',
                type: 'string',
                headerName: 'Question',
            },
            {
                field: 'createdAt',
                type: 'dateTime',
                headerName: 'Date Created',
            },
            {
                field: 'actions',
                headerName: 'Action',
                type: 'actions',
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        onClick={deleteUser(params.id)}
                        label="Delete"
                    />,
                    <GridActionsCellItem
                        icon={<FontAwesomeIcon icon={faEye} className="me-2" />}
                        label="View Details"
                        showInMenu
                    />,
                    <GridActionsCellItem
                        icon={<FontAwesomeIcon icon={faEdit} className="me-2" />}
                        label="Edit"
                        showInMenu
                        onClick={editQuestion(params.id)}
                    />,
                ],
            },
        ],
        [deleteUser, toggleAdmin, duplicateUser],
    );

    const fetchQuestionList = async () => {
        try {
            const response = await getAllQuestions()
            if (response.status === 200) {
                setData(response?.data?.question.map(item => {
                    return (
                        {
                            ...item,
                            explanation: undefined,
                            choices: undefined,
                            id: item._id,
                            _id: undefined
                        }
                    )
                }))
            }
        } catch (error) {
            alert(error)
        }
    }
    useEffect(() => {
        (async () => {
            await fetchQuestionList()
        })()
    }, []);



    return (
        <>
            <ModalAddNewQuestion 
            fetchQuestionList={fetchQuestionList}
            show={show} handleClose={handleClose} item={currentQuestion} />
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <Breadcrumb
                        className="d-none d-md-inline-block"
                        listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
                    >
                        <Breadcrumb.Item>
                            <FontAwesomeIcon icon={faHome} />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>{Routes.QuestionPage.name}</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>{Routes.QuestionPage.name}</h4>
                    <p className="mb-0">
                        Below tables will shown all of course in your website and some
                        information about them.
                    </p>
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Button className="mx-2" onClick={handleShow}>
                        <FontAwesomeIcon icon={faPlus} className="me-2" />
                        New Question
                    </Button>
                    <ButtonGroup>
                        <Button variant="outline-primary" size="sm">
                            Share
                        </Button>
                        <Button variant="outline-primary" size="sm">
                            Export
                        </Button>
                    </ButtonGroup>
                </div>
            </div>

            <div className="table-settings mb-4">
                <TablesQuestion
                    title={columns}
                    deleteUser={deleteUser}
                    toggleAdmin={toggleAdmin}
                    duplicateUser={duplicateUser}
                    data={data} handleShow={handleShow} />
            </div>
        </>
    );
}

export default QuestionPage;