import { ActionType, User, UserEditAction } from "../model/User";

export const userReducer = (user: User, action: UserEditAction): User => {
    switch (action.type) {
        case ActionType.SET_ROLE:
            return new User(user.name, action.value.role);
        case ActionType.SET_NAME:
            return new User(action.value.name, user.role);
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}