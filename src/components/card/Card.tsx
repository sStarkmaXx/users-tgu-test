import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { UserType } from '../../store/users';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import './Card.css';
import { usersActions } from '../../store/user.slice';

type UsreCardPropsType = {
  user: UserType;
};

const UserCard: React.FC<UsreCardPropsType> = ({ user }) => {
  const selectedUsers = useSelector<RootState, UserType[]>(
    (state) => state.users.selectedUsers
  );
  const dispatch = useDispatch();
  const onClickHandler = (user: UserType) => {
    dispatch(usersActions.selectUser(user));
  };

  let isSelected: boolean;

  const selectedUser = selectedUsers.find((us) => us.id === user.id);
  if (selectedUser) {
    isSelected = true;
  } else {
    isSelected = false;
  }

  return (
    <Card
      style={{ width: '300px' }}
      className={isSelected ? 'selected' : ''}
      onClick={() => onClickHandler(user)}
    >
      <div className="flex-grow-1">
        <Card.Img variant="top" src={user.avatar} />
      </div>
      <Card.Body className="flex-grow-0">
        <Card.Title>{`${user.lastName} ${user.firstName} ${
          user.patronymic && user.patronymic
        }`}</Card.Title>
        <Card.Text>{new Date(user.createDate).toLocaleString()}</Card.Text>
        <LinkContainer to={`/${user.id}`}>
          <Button variant="primary">View profile</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
