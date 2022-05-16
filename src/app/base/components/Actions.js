
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import { faEdit, faEllipsisH, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Actions = () => {
    return ( 
        <>
            <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                <span className="icon icon-sm">
                    <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item>
                    <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
                </Dropdown.Item>
                <Dropdown.Item>
                    <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                </Dropdown.Item>
                <Dropdown.Item className="text-danger">
                    <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
                </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
     );
}
 
export default Actions;