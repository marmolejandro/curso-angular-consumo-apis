export interface User{
    id: string;
    name: string;
    email: string;
    password: string;
}

// Omit -> omite los campos indicados
export interface CreateUserDTO extends Omit<User, 'id'> {}