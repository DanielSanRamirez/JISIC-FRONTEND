export class Usuario {

    constructor(
        public nombre: string,
        public perfil: 'USER_ADMIN' | 'USER_SECRE' | 'USER_TESO',
        public nombres: string,
        public estado?: boolean,
        public password?: string,
        public _id?: string,
    ) { }
}