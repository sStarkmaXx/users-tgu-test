import Modal from 'react-bootstrap/Modal';
import CreateUserForm from '../../widgets/createUserForm/CreateUserForm';
import UsersList from '../../widgets/usersList/UsersList';

export type ModalType = 'del' | 'create' | 'edit';

type ModalWindowPropsType = {
  show: boolean;
  onHide: () => void;
  modalType: ModalType;
  name: string;
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
          {props.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {(props.modalType === 'create' || props.modalType === 'edit') && (
          <CreateUserForm closeModalWindow={props.onHide} />
        )}
        {props.modalType === 'del' && <UsersList />}
      </Modal.Body>
    </Modal>
  );
};

export default ModalWindow;
