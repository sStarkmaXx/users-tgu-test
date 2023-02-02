import UserCard from '../../components/card/Card';
import { users as us } from '../../store/users';
import './MainPage.css';
import { UserType } from '../../store/users';
import { sortByDate } from '../../shared/libs';
import { v1 } from 'uuid';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useState } from 'react';
import ModalWindow from '../modal/ModalWindow';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const MainPage = () => {
  const [modalShow, setModalShow] = useState(false);
  const allUsers = useSelector<RootState, UserType[]>(
    (state) => state.users.allUsers
  );
  // const sortedUsers = sortByDate(allUsers);

  const users = allUsers.map((user: UserType) => {
    return <UserCard key={v1()} user={user} />;
  });

  return (
    <div className="main-page">
      <div className="header">
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary" onClick={() => setModalShow(true)}>
            Create user
          </Button>
          <Button variant="secondary">Del user</Button>
        </ButtonGroup>
      </div>
      <div className="content">{users}</div>
      <ModalWindow show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default MainPage;
