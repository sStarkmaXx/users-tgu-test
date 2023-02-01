import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { UserType } from '../store/users';
import { LinkContainer } from 'react-router-bootstrap';

type UsreCardPropsType = {
  user: UserType;
};

const UserCard: React.FC<UsreCardPropsType> = ({ user }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={user.avatar} />
      <Card.Body>
        <Card.Title>{`${user.lastName} ${user.firstName} ${
          user.patronymic && user.patronymic
        }`}</Card.Title>
        <Card.Text>{user.createDate}</Card.Text>
        <LinkContainer to={`/${user.id}`}>
          <Button variant="primary">View profile</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
