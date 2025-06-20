declare global {
    interface IUser {
        id: number;
        name: string;
        email: string;
        bio?: string | null;
        avatar?: string | null;
        password?: string | null;
        posts?: IPost[];
        comments?: IComment[];
        likes?: ILike[];
        createdAt?: Date;
        updatedAt?: Date;
    }

    interface IPost {
        id: number;
        slug?: string | null;
        title: string;
        content: string;
        thumbnail?: string | null;
        published: boolean;
        authorId: number;
        author?: IUser;
        comments?: IComment[];
        tags?: ITag[];
        likes?: ILike[];
        createdAt?: Date;
        updatedAt?: Date;
    }

    interface IComment {
        id: number;
        content: string;
        postId: number;
        post?: IPost;
        authorId: number;
        author?: IUser;
        createdAt?: Date;
        updatedAt?: Date;
    }

    interface ITag {
        id: number;
        name: string;
        posts?: IPost[];
    }

    interface ILike {
        id: number;
        userId: number;
        postId: number;
        user?: IUser;
        post?: IPost;
    }

    interface IAuthJwtPayload {
        userId: number;
    }
}

export { };