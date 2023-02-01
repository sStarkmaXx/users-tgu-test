import UserCard from '../components/Card';
import { users as us } from '../store/users';

const MainPage = () => {
  const users = us.map((user) => {
    return <UserCard user={user} />;
  });

  return <div className="main-page">{users}</div>;
};

export default MainPage;
