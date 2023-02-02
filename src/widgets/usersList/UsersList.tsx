import ListGroup from 'react-bootstrap/ListGroup';
import { RootState } from '../../store/index';
import { UserType } from '../../store/users';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Button } from 'react-bootstrap';
import { usersActions } from '../../store/user.slice';

function UsersList() {
  const selectedUsers = useSelector<RootState, UserType[]>(
    (state) => state.users.selectedUsers
  );

  const dispatch = useDispatch();

  const onClickHandler = (user: UserType) => {
    dispatch(usersActions.delUser(user));
  };

  const users = selectedUsers.map((user) => {
    return (
      <ListGroup.Item>
        <Row>
          <Col>{user.lastName}</Col>
          <Col>{user.firstName}</Col>
          <Col>{user.patronymic}</Col>
          <Col>
            <Button variant="danger" onClick={() => onClickHandler(user)}>
              Delete User
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  });

  return <ListGroup>{users}</ListGroup>;
}

export default UsersList;
