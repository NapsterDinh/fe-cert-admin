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
import { Tag, Tooltip } from "antd";
import ModalConfirmDelete from 'app/base/components/ModalConfirmDelete/ModalConfirmDelete';
import { openNotificationWithIcon } from "app/base/components/Notification";
import { deleteExam, getAllExam } from "app/core/apis/exam";
//data
import { Routes } from "app/routes";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShowModal, updateModalInfo } from 'store/confirmDeleteReducer';
import TablesExam from './TablesExam/TablesExam';

const ExamPage = () => {
    const [data, setData] = useState([])
    const [show, setShow] = useState(false);

    const modalConfirmDelete = useSelector(state => state.confirmDelete)
    const dispatch = useDispatch()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [currentQuestion, setCurrentQuestion] = useState('')

    dispatch(updateModalInfo(
        {
            title: 'Confirm delete this exam',
            body: `Are you sure to delete this exam ?
            This modified changes will not saved and you can't rollback`
        }
    ))

    const handleDeleteExam = async () => {
        try {
            const response = await deleteExam({
                _id: currentQuestion
            })
            if (response.status === 200) {
                await fetchAllExam()
                dispatch(toggleShowModal({ show: false }))
                openNotificationWithIcon('success', 'Delete exam successfully')
            }
        } catch (error) {
            alert(error)
        }
    }

    const deleteUser = React.useCallback(
        (id) => () => {
            setCurrentQuestion(id)
            dispatch(toggleShowModal({ show: true }))
        },
        [],
    );

    const editQuestion = React.useCallback((id) => () => {
        window.location = `/exam-management/${id}`
    }, [])


    const columns = React.useMemo(
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
                field: 'location',
                type: 'string',
                headerName: 'Location',
            },
            {
                field: 'title',
                type: 'string',
                headerName: 'Title of Exam',
            },
            {
                field: 'eventDate',
                type: 'actions',
                headerName: 'Event Date',
                getActions: (params) => {
                    return(
                        [
                            <span className="text-center">{new Date(params.row.eventDate).toLocaleDateString()}</span>
                        ]
                    )
                }
            },
            {
                field: 'isPublic',
                type: 'actions',
                headerName: 'Status',
                getActions: (params) => {
                    return(
                        [
                            <Tag color={params.row.isPublic === 'Public' 
                            ? "success" : "processing"
                        }>{params.row.isPublic}</Tag>
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
                        onClick={editQuestion(params.id)}
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
        [deleteUser],
    );


    const fetchAllExam = async () => {
        try {
            const response = await getAllExam()
            if (response.status === 200) {
                setData(response.data.exam.map(item => ({
                    ...item,
                    id: item._id
                })))
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        (async () => {
            await fetchAllExam()
        })()
    }, []);

    return (
        <>
            <ModalConfirmDelete
                handleSubmit={handleDeleteExam}
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
                        <Breadcrumb.Item active>{Routes.ExamPage.name}</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>{Routes.ExamPage.name}</h4>
                    <p className="mb-0">
                        Below tables will shown all of course in your website and some
                        information about them.
                    </p>
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Button className="mx-2" onClick={() => window.location = '/exam-management/add'}>
                        <FontAwesomeIcon icon={faPlus} className="me-2" />
                        New Exam
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
                <TablesExam
                    title={columns}
                    deleteUser={deleteUser}
                    data={data} handleShow={handleShow} />
            </div>
        </>
    );
}

export default ExamPage;