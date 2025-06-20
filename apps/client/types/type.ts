declare global {
    type TApiResponse = {
        data?: TDataResponse | null;
        error?: string;
        message?: string;
        status?: boolean;
    } | undefined;

    type TDataResponse = {
        post?: IPost;
        posts?: IPost[];
        postCount?: number;

        comment?: IComment;
        comments?: IComment[];
        commentCount?: number;

        tag?: ITag;
        tags?: ITag[];
        tagCount?: number;

        like?: ILike;
        likes?: ILike[];
        likeCount?: number;

        user?: IUser;
        users?: IUser[];
        userCount?: number;

        accessToken?: string;
    };

    type Variables = Record<string, unknown>;
}
export { };