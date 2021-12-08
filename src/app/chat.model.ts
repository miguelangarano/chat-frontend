export class Chat {
    constructor(
        public name: string,
        public adminNickname: string,
        public users: ChatUser[],
        public messages: ChatMessage[]
    ) { }
}

export class SimpleChat {
    constructor(
        public id: string,
        public name: string,
        public status?: boolean
    ) { }
}

export class ChatUser {
    constructor(
        public email: string,
        public nickname: string,
        public imageUrl: string
    ) { }
}

export class ChatMessage {
    constructor(
        public id: string,
        public sender: ChatUser,
        public date: number,
        public body: string
    ) { }
}