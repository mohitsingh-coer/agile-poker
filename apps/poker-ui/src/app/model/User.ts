export enum UserRole{
    ENGINEER = 'Engineer',
    SCRUM_MASTER = 'Scrum_Master'
}

export class User{
    name: string;
    role: UserRole;

    constructor(name: string, role: UserRole){
        this.name = name;
        this.role = role;
    }
}

export enum ActionType{
    SET_ROLE = 'setRole',
    SET_NAME = 'setName'
}

export class UserEditAction{
    type: ActionType;
    value: User;

    constructor(type: ActionType, value: User){
        this.type = type;
        this.value = value;
    }
}