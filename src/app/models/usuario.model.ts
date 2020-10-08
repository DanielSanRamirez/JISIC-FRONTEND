export class Usuario {

    constructor(
        public nombre: string,
        public perfil: string,
        public nombres: string,
        public password?: string,
        public _id?: string,
    ) { }
}