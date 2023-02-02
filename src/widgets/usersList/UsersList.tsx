import ListGroup from 'react-bootstrap/ListGroup';
import { RootState } from '../../store/index';
import { UserType } from '../../store/users';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Button, Nav } from 'react-bootstrap';
import { usersActions } from '../../store/user.slice';
import { LinkContainer } from 'react-router-bootstrap';

function UsersList() {
  let selectedUsers = useSelector<RootState, UserType[]>(
    (state) => state.users.selectedUsers
  );

  const openedUser = useSelector<RootState, UserType | undefined>(
    (state) => state.users.openedUser
  );

  if (openedUser) {
    selectedUsers = [openedUser];
  }

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
            {openedUser ? (
              <LinkContainer to="/">
                <Nav.Link onClick={() => onClickHandler(user)}>
                  Delete User
                </Nav.Link>
              </LinkContainer>
            ) : (
              <Button variant="danger" onClick={() => onClickHandler(user)}>
                Delete User
              </Button>
            )}
          </Col>
        </Row>
      </ListGroup.Item>
    );
  });

  return <ListGroup>{users}</ListGroup>;
}

export default UsersList;
