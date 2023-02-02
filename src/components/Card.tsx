import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { UserType } from '../store/users';
import { LinkContainer } from 'react-router-bootstrap';

type UsreCardPropsType = {
  user: UserType;
};

const UserCard: React.FC<UsreCardPropsType> = ({ user }) => {
  return (
    <Card style={{ width: '300px' }}>
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
