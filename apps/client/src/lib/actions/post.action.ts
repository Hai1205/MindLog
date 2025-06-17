"use server";

import { authFetchGraphQL, fetchGraphQL } from "../fetchGraphQL";
import { CommentFormSchema, PostFormSchema } from "../formSchemas/post.formSchema";
import { CREATE_COMMENT_MUTATION, CREATE_POST_MUTATION, DELETE_POST_MUTATION, GET_POST_BY_ID, GET_POST_COMMENTS, GET_POSTS, GET_USER_POSTS, LIKE_POST_MUTATION, POST_LIKES, UNLIKE_POST_MUTATION, UPDATE_POST_MUTATION } from "../gqlQueries/post.query";
import { transformTakeSkip } from "../helpers";
import { uploadThumbnail } from "../upload";
import { print } from "graphql";

export const fetchPosts = async ({
  page,
  pageSize,
}: {
  page?: number;
  pageSize?: number;
}) => {
  const { skip, take } = transformTakeSkip({ page, pageSize });
  const data = await fetchGraphQL(print(GET_POSTS), { skip, take });

  return { posts: data.posts as IPost[], totalPosts: data.postCount };
};

export const fetchPostById = async (id: number) => {
  const data = await fetchGraphQL(print(GET_POST_BY_ID), { id });

  return data.getPostById as IPost;
};

export async function fetchUserPosts({
  page,
  pageSize,
}: {
  page?: number;
  pageSize: number;
}) {
  const { take, skip } = transformTakeSkip({ page, pageSize });
  const data = await authFetchGraphQL(print(GET_USER_POSTS), {
    take,
    skip,
  });

  return {
    posts: data.getUserPosts as IPost[],
    totalPosts: data.userPostCount as number,
  };
}

export async function saveNewPost(
  formData: FormData
): Promise<PostFormState> {
  const validatedFields = PostFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };
  let thumbnailUrl = "";
  if (validatedFields.data.thumbnail)
    thumbnailUrl = await uploadThumbnail(validatedFields.data.thumbnail);

  const data = await authFetchGraphQL(print(CREATE_POST_MUTATION), {
    input: {
      ...validatedFields.data,
      thumbnail: thumbnailUrl,
    },
  });

  if (data) return { message: "Success! New Post Saved", ok: true };
  return {
    message: "Oops, Something Went Wrong",
    data: Object.fromEntries(formData.entries()),
  };
}

export async function updatePost(
  formData: FormData
): Promise<PostFormState> {
  const validatedFields = PostFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };

  const { thumbnail, ...inputs } = validatedFields.data;

  let thumbnailUrl = "";
  if (thumbnail) thumbnailUrl = await uploadThumbnail(thumbnail);

  const data = await authFetchGraphQL(print(UPDATE_POST_MUTATION), {
    input: {
      ...inputs,
      ...(thumbnailUrl && { thumbnail: thumbnailUrl }),
    },
  });

  if (data) return { message: "Success! The Post Updated", ok: true };
  return {
    message: "Oops, Something Went Wrong",
    data: Object.fromEntries(formData.entries()),
  };
}

export async function deletePost(postId: number) {
  const data = await authFetchGraphQL(print(DELETE_POST_MUTATION), {
    postId,
  });

  return data.deletePost;
}

export async function getPostComments({
  postId,
  skip,
  take,
}: {
  postId: number;
  skip: number;
  take: number;
}) {
  const data = await fetchGraphQL(print(GET_POST_COMMENTS), {
    postId,
    take,
    skip,
  });

  return {
    comments: data.getPostComments as IComment[],
    count: data.postCommentCount as number,
  };
}

export async function saveComment(
  state: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> {
  const validatedFields = CommentFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };

  const data = await authFetchGraphQL(print(CREATE_COMMENT_MUTATION), {
    input: {
      ...validatedFields.data,
    },
  });

  console.log({ data });

  if (data)
    return {
      message: "Success! Your comment saved!",
      ok: true,
      open: false,
    };

  return {
    message: "Oops! Something went wrong!",
    ok: false,
    open: true,
    data: Object.fromEntries(formData.entries()),
  };
}

export async function getPostLikeData(postId: number) {
  const data = await authFetchGraphQL(print(POST_LIKES), {
    postId,
  });

  return {
    likeCount: data.postLikesCount as number,
    userLikedPost: data.userLikedPost as boolean,
  };
}

export async function likePost(postId: number) {
  const data = await authFetchGraphQL(print(LIKE_POST_MUTATION), {
    postId,
  });

  console.log({ data });
}

export async function unLikePost(postId: number) {
  const data = await authFetchGraphQL(print(UNLIKE_POST_MUTATION), {
    postId,
  });

  console.log({ data });
}