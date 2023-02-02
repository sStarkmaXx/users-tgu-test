import Modal from 'react-bootstrap/Modal';
import CreateUserForm from '../../widgets/createUserForm/CreateUserForm';

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
        <CreateUserForm closeModalWindow={props.onHide} />
      </Modal.Body>
    </Modal>
  );
};

export default ModalWindow;
