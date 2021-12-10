export class User {
    constructor(
        public email: string,
        public nickname: string,
        public imageUrl?: string,
        public token?: string,
        public id?: string,
    ) { }
}