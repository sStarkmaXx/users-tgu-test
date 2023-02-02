import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type ModalWindowPropsType = {
  show: boolean;
  onHide: () => void;
};

const ModalWindow: React.FC<ModalWindowPropsType> = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create user
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Patronymic</Form.Label>
            <Form.Control type="text" placeholder="Enter patronymic" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>About me</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter information about yourself"
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={props.onHide}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalWindow;
