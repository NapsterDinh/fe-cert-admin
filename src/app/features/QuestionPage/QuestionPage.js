import {
    faEdit, faEye, faHome,
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteIcon from '@mui/icons-material/Delete';
import { GridActionsCellItem } from '@mui/x-data-grid';
import {
    Breadcrumb, Button,
    ButtonGroup
} from "@themesberg/react-bootstrap";
import ModalConfirmDelete from 'app/base/components/ModalConfirmDelete/ModalConfirmDelete';
import { openNotificationWithIcon } from "app/base/components/Notification";
import { deleteQuestion, getAllQuestions, getQuestionById } from 'app/core/apis/question';
//data

import { Routes } from "app/routes";
import React, { useCallback, useEffect, useMemo, useState } from 'react';
//components
import { useDispatch, useSelector } from 'react-redux';
import { toggleShowModal, updateModalInfo } from 'store/confirmDeleteReducer';
import ModalAddNewQuestion from "./ModalAddNewQuestion/ModalNewQuestion";
import TablesQuestion from './TablesQuestion/TablesQuestion';
import { Tooltip } from "antd";

const QuestionPage = () => {
    const [data, setData] = useState([])
    const [show, setShow] = useState(false);

    const modalConfirmDelete = useSelector(state => state.confirmDelete)
    const dispatch = useDispatch()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [currentQuestion, setCurrentQuestion] = useState('')
    const [itemChooseDelete, setItemChooseDelete] = useState('')

    dispatch(updateModalInfo(
        {
            title: 'Confirm delete this question',
            body: `Are you sure to delete this question ?
            This question in exam which contains this will be remove.
            This modified changes will not saved and you can't rollback`
        }
    ))

    const handleDeleteQuestion = async () => {
        try {
            const response = await deleteQuestion({
                _id: itemChooseDelete
            })
            if (response.status === 200) {
                await fetchQuestionList()
                dispatch(toggleShowModal({ show: false }))
                openNotificationWithIcon('success', 'Delete question successfully')
            }
        } catch (error) {
            alert(error)
        }
    }
    const deleteUser = useCallback(
        (id) => () => {
            setItemChooseDelete(id)
            dispatch(toggleShowModal({ show: true }))
        },
        [data],
    );

    const editQuestion = useCallback((id) => () => {
        (async () => {
            try {
                const response = await getQuestionById(id)
                if (response.status === 200) {
                    setCurrentQuestion(response.data?.question[0]);
                    handleShow()
                }
            } catch (error) {
                alert(error)
            }
        })()
    }, [])

    const columns = useMemo(
        () => [
            {
                field: 'id',
                headerName: 'ID',
                type: 'actions',
                align: 'left',
                getActions: (params) => {
                    return(
                        [
                            <Tooltip title={params.row.id} color={'#108ee9'} key={'#108ee9'}>
                                {params.row.id}
                            </Tooltip>
                        ]
                    )
                }
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
                type: 'actions',
                headerName: 'Date Created',
                getActions: (params) => {
                    return(
                        [
                            <span className="text-center">{new Date(params.row.createdAt).toLocaleDateString()}</span>
                        ]
                    )
                }
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
        [deleteUser, editQuestion],
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

    useEffect(() => {
        if (currentQuestion !== '') {
            handleShow()
        }
    }, [currentQuestion])


    return (
        <>
            <ModalAddNewQuestion
                fetchQuestionList={fetchQuestionList}
                show={show} handleClose={handleClose} item={currentQuestion} 
                setItem={setCurrentQuestion}
                />
            <ModalConfirmDelete
                handleSubmit={handleDeleteQuestion}
                handleClose={() => dispatch(toggleShowModal({ show: false }))}
                {...modalConfirmDelete}
            />
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
                    {/* <ButtonGroup>
                        <Button variant="outline-primary" size="sm">
                            Share
                        </Button>
                        <Button variant="outline-primary" size="sm">
                            Export
                        </Button>
                    </ButtonGroup> */}
                </div>
            </div>

            <div className="table-settings mb-4">
                <TablesQuestion
                    title={columns}
                    deleteUser={deleteUser}
                    data={data} handleShow={handleShow} />
            </div>
        </>
    );
}

export default QuestionPage;