import UserCard from '../../components/card/Card';
import './MainPage.css';
import { UserType } from '../../store/users';
import { sortByDate } from '../../shared/libs';
import { v1 } from 'uuid';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useState } from 'react';
import ModalWindow, { ModalType } from '../modal/ModalWindow';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const MainPage = () => {
  const [modalShow, setModalShow] = useState<{
    isShow: boolean;
    type: ModalType;
    name: string;
  }>({
    isShow: false,
    type: 'create',
    name: '',
  });

  const allUsers = useSelector<RootState, UserType[]>(
    (state) => state.users.allUsers
  );

  const selectedUsers = useSelector<RootState, UserType[]>(
    (state) => state.users.selectedUsers
  );
  // const sortedUsers = sortByDate(allUsers);

  const onClickHandler = (type: ModalType, name: string) => {
    setModalShow({ isShow: true, type, name });
  };

  const users = allUsers.map((user: UserType) => {
    return <UserCard key={v1()} user={user} />;
  });

  return (
    <div className="main-page">
      <div className="header">
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="success"
            onClick={() => onClickHandler('create', 'Create user')}
          >
            Create user
          </Button>
          {!!selectedUsers.length && (
            <Button
              variant="danger"
              onClick={() => onClickHandler('del', 'Del user')}
            >
              Del user
            </Button>
          )}
        </ButtonGroup>
      </div>
      <div className="content">{users}</div>
      <ModalWindow
        show={modalShow.isShow}
        onHide={() => setModalShow({ isShow: false, type: 'create', name: '' })}
        modalType={modalShow.type}
        name={modalShow.name}
      />
    </div>
  );
};

export default MainPage;
