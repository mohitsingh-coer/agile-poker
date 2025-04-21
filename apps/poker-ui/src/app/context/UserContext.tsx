import { createContext, useContext, useReducer } from 'react';
import { User, UserEditAction, UserRole } from '../model/User';
import { userReducer } from './UserReducer';

const UserContext = createContext<{
    user: User;
    dispatch: React.Dispatch<UserEditAction>;
}>({ 
    user: new User('', UserRole.ENGINEER),
    dispatch: () => null 
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, dispatch] = useReducer(userReducer, new User('', UserRole.ENGINEER));

    return (
        <UserContext.Provider value={{ user, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);