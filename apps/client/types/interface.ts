declare global {
    interface IUser {
        id: number;
        name: string;
        email: string;
        bio?: string | null;
        avatar?: string | null;
        posts?: IPost[];
        comments?: IComment[];
        likes?: ILike[];
        createdAt?: string;
        updatedAt?: string;
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
        createdAt?: string;
        updatedAt?: string;
    }

    interface IComment {
        id: number;
        content: string;
        postId: number;
        post?: IPost;
        authorId: number;
        author?: IUser;
        createdAt?: string;
        updatedAt?: string;
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
