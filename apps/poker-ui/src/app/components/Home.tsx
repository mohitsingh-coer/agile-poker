import { useState } from 'react';
import { ActionType, User, UserEditAction, UserRole } from '../model/User';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

type T_UserRole = keyof typeof UserRole;

const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('');
  const [role, setRole] = useState<T_UserRole | undefined>(undefined);
  const { user, dispatch } = useUser();

  const roles: T_UserRole[] = Object.keys(UserRole) as T_UserRole[];

  function isFormInComplete(): boolean | undefined {
    if (userName && userName.length > 4 && role) {
      return false;
    }
    return true;
  }

  function renderNextPage(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    const userRole = UserRole[role as T_UserRole];
    dispatch(
      new UserEditAction(ActionType.SET_ROLE, new User(userName, userRole))
    );
    dispatch(
      new UserEditAction(ActionType.SET_NAME, new User(userName, userRole))
    );
    if (userRole === UserRole.SCRUM_MASTER) {
      navigate('/scrum-master');
    } else if (userRole === UserRole.ENGINEER) {
      navigate('/engineer');
    }
  }

  return (
    <div className="home__container">
      <h1>Welcome to Poker Planning</h1>
      <h2>Please select your role</h2>
      <select
        id="roleSelect"
        className="select select-bordered"
        value={role}
        onChange={(e) => setRole(e.target.value as T_UserRole)}
      >
        <option value="">Select a role</option>
        {roles.map((role) => (
          <option key={role} value={role}>
            {UserRole[role]}
          </option>
        ))}
      </select>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button disabled={isFormInComplete()} onClick={renderNextPage}>
        ENTER
      </button>
    </div>
  );
};

export default Home;
