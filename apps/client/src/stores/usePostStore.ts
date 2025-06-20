import { toast } from "react-toastify";
import { PostFormSchema } from "@/utils/formSchemas/post.formSchema";
import { graphqlService } from "@/utils/services/graphql";
import {
	CREATE_POST_MUTATION,
	UPDATE_POST_MUTATION,
	DELETE_POST_MUTATION,
	GET_USER_POSTS,
	GET_ALL_POSTS,
	LIKE_POST_MUTATION,
	UNLIKE_POST_MUTATION,
	POST_LIKES,
	CREATE_COMMENT_MUTATION,
	GET_POST_BY_ID
} from "@/utils/gqlQueries/post.query";
import { createStore, BaseStore } from "../utils/services/createStore";
import { GET_POST_COMMENTS } from "@/utils/gqlQueries/comment.query";

export interface PostStore extends BaseStore {
	posts: IPost[];
	post: IPost | null;
	currentPost: IPost | null;
	totalPosts: number;
	likeCount: number;
	userLikedPost: boolean;
	comments: IComment[];
	CommentCount: number;

	getUserPosts: (skip?: number, take?: number) => Promise<TApiResponse>;
	getAllPosts: (skip?: number, take?: number) => Promise<TApiResponse>;
	getPostById: (postId: number) => Promise<TApiResponse>;
	createPost: (formData: FormData) => Promise<TApiResponse>;
	updatePost: (formData: FormData) => Promise<TApiResponse>;
	deletePost: (postId: number) => Promise<TApiResponse>;
	likePost: (postId: number) => Promise<TApiResponse>;
	unlikePost: (postId: number) => Promise<TApiResponse>;
	getPostLikeData: (postId: number) => Promise<TApiResponse>;
	createComment: (postId: number, content: string) => Promise<TApiResponse>;
	getPostComments: (postId: number, skip?: number, take?: number) => Promise<TApiResponse>;
}

const initialState = {
	posts: [],
	post: null,
	currentPost: null,
	totalPosts: 0,
	comments: [],
	CommentCount: 0,
	likeCount: 0,
	userLikedPost: false
};

export const usePostStore = createStore<PostStore>(
	"post",
	initialState,
	(set, get) => ({
		getUserPosts: async (skip = 0, take = 10): Promise<TApiResponse> => {
			return await get().handleRequest(async () => {
				const response = await graphqlService.query(GET_USER_POSTS, { skip, take });

				if (response && response.status && response.data) {
					set({
						posts: response.data.posts,
						totalPosts: response.data.postCount
					});

					return { status: true, data: response.data };
				}

				return response;
			});
		},

		getAllPosts: async (skip = 0, take = 10): Promise<TApiResponse> => {
			return await get().handleRequest(async () => {
				const response = await graphqlService.query(GET_ALL_POSTS, { skip, take });

				if (response && response.status && response.data) {
					set({
						posts: response.data.posts,
						totalPosts: response.data.postCount
					});

					return { status: true, data: response.data };
				}

				return response;
			});
		},

		getPostById: async (postId: number): Promise<TApiResponse> => {
			return await get().handleRequest(async () => {
				const response = await graphqlService.query(GET_POST_BY_ID, { id: postId });

				if (response && response.status && response.data) {
					set({ currentPost: response.data.post });
					return { status: true, data: response.data.post };
				}

				return response;
			});
		},

		getPostComments: async (params: { postId: number, skip?: number, take?: number }): Promise<TApiResponse> => {
			const { postId, skip = 0, take = 10 } = params;
			return await get().handleRequest(async () => {
				const response = await graphqlService.query(GET_POST_COMMENTS, { postId, skip, take });

				if (response && response.status && response.data) {
					set({
						comments: response.data.comments || [],
						CommentCount: response.data.commentCount || 0
					});

					return {
						status: true,
						data: {
							comments: response.data.comments,
							count: response.data.commentCount
						}
					};
				}

				return response;
			});
		},

		createPost: async (formData: FormData): Promise<TApiResponse> => {
			return await get().handleRequest(async () => {
				const values = PostFormSchema.parse(Object.fromEntries(formData));

				const response = await graphqlService.mutate(CREATE_POST_MUTATION, {
					input: values,
				});

				if (response && response.status) toast.success("Tạo bài viết thành công!");

				return response;
			});
		},

		updatePost: async (formData: FormData): Promise<TApiResponse> => {
			return await get().handleRequest(async () => {
				const values = PostFormSchema.parse(Object.fromEntries(formData));

				const response = await graphqlService.mutate(UPDATE_POST_MUTATION, {
					input: values,
				});

				if (response && response.status) toast.success("Cập nhật bài viết thành công!");

				return response;
			});
		},

		deletePost: async (postId: number): Promise<TApiResponse> => {
			return await get().handleRequest(async () => {
				const response = await graphqlService.mutate(DELETE_POST_MUTATION, { postId });

				if (response && response.status) toast.success("Xóa bài viết thành công!");

				return response;
			});
		},

		likePost: async (postId: number): Promise<TApiResponse> => {
			return await get().handleRequest(async () => {
				const response = await graphqlService.mutate(LIKE_POST_MUTATION, { postId });
				return response;
			});
		},

		unlikePost: async (postId: number): Promise<TApiResponse> => {
			return await get().handleRequest(async () => {
				const response = await graphqlService.mutate(UNLIKE_POST_MUTATION, { postId });
				return response;
			});
		},

		getPostLikeData: async (postId: number): Promise<TApiResponse> => {
			return await get().handleRequest(async () => {
				const response = await graphqlService.query(POST_LIKES, { postId });

				if (response && response.status && response.data) {
					set({
						likeCount: response.data.likeCount || 0,
						userLikedPost: response?.data?.likes?.length && response?.data?.likes?.length > 0 || false
					});

					return {
						status: true,
						data: {
							likeCount: response.data.likeCount,
							userLikedPost: response.data.likes
						}
					};
				}

				return response;
			});
		},

		createComment: async (postId: number, content: string): Promise<TApiResponse> => {
			return await get().handleRequest(async () => {
				const response = await graphqlService.mutate(CREATE_COMMENT_MUTATION, {
					input: { postId, content }
				});

				if (response && response.status) toast.success("Bình luận đã được đăng!");

				return response;
			});
		},
	})
);