import UserCard from '../../components/card/Card';
import './MainPage.css';
import { UserType } from '../../store/users';
import { sortByDate } from '../../shared/libs';
import { v1 } from 'uuid';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useState } from 'react';
import ModalWindow from '../modal/ModalWindow';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { usersActions } from '../../store/user.slice';
import AutoHideToast from '../../shared/ui/AutoHideToast';

const MainPage = () => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const allUsers = useSelector<RootState, UserType[]>(
    (state) => state.users.allUsers
  );
  const selectedUsers = useSelector<RootState, UserType[]>(
    (state) => state.users.selectedUsers
  );
  // const sortedUsers = sortByDate(allUsers);

  const onClickHandler = () => {
    dispatch(usersActions.delUser(selectedUsers));
  };

  const users = allUsers.map((user: UserType) => {
    return <UserCard key={v1()} user={user} />;
  });

  return (
    <div className="main-page">
      <div className="header">
        <ButtonGroup aria-label="Basic example">
          <Button variant="success" onClick={() => setModalShow(true)}>
            Create user
          </Button>
          {!!selectedUsers.length && (
            <Button variant="danger" onClick={onClickHandler}>
              Del user
            </Button>
          )}
        </ButtonGroup>
      </div>
      <div className="content">{users}</div>
      <ModalWindow show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default MainPage;
