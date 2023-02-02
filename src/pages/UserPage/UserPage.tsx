import ModalWindow, { ModalType } from '../modal/ModalWindow';
import { Button, ButtonGroup, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { UserType } from '../../store/users';
import { useState } from 'react';

const UserPage = () => {
  const openedUser = useSelector<RootState, UserType>(
    (state) => state.users.openedUser!
  );

  const [modalShow, setModalShow] = useState<{
    isShow: boolean;
    type: ModalType;
    name: string;
  }>({
    isShow: false,
    type: 'edit',
    name: '',
  });

  const onClickHandler = (type: ModalType, name: string) => {
    setModalShow({ isShow: true, type, name });
  };

  return (
    <div className="main-page">
      <div className="header">
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="success"
            onClick={() => onClickHandler('edit', 'Edit user')}
          >
            Edit user
          </Button>
          <Button
            variant="danger"
            onClick={() => onClickHandler('del', 'Del user')}
          >
            Del user
          </Button>
        </ButtonGroup>
      </div>
      <div className="content">
        <Card style={{ width: '50%' }}>
          <Card.Img variant="top" src={openedUser.avatar} />
          <Card.Body>
            <Card.Title>{`${openedUser.lastName} ${openedUser.firstName} ${
              openedUser.patronymic && openedUser.patronymic
            }`}</Card.Title>
            <Card.Text>{openedUser.about}</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <ModalWindow
        show={modalShow.isShow}
        onHide={() => setModalShow({ isShow: false, type: 'create', name: '' })}
        modalType={modalShow.type}
        name={modalShow.name}
      />
    </div>
  );
};

export default UserPage;
