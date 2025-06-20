import { RegisterFormSchema, LoginFormSchema } from "@/utils/formSchemas/auth.formSchema";
import { toast } from "react-toastify";
import { REGISTER_MUTATION, LOGIN_MUTATION } from "@/utils/gqlQueries/auth.query";
import { graphqlService } from "@/utils/services/graphql";
import { usePostStore } from "./usePostStore";
import { createStore, BaseStore } from "../utils/services/createStore";

export interface AuthStore extends BaseStore {
	userAuth: IUser | null;
	register: (formData: FormData) => Promise<TApiResponse>;
	login: (formData: FormData) => Promise<TApiResponse>;
}

const initialState = {
	userAuth: null,
};

export const useAuthStore = createStore<AuthStore>(
	"auth",
	initialState,
	(set, get) => ({
		register: async (formData: FormData): Promise<TApiResponse> => {
			const values = RegisterFormSchema.parse(Object.fromEntries(formData));

			return await get().handleRequest(async () => {
				const response = await graphqlService.mutate(REGISTER_MUTATION, {
					registerInput: {
						name: values.name || "",
						email: values.email || "",
						password: values.password || "",
					},
				});

				if (response && response.status) toast.success("Đăng ký thành công!");

				return response;
			});
		},

		login: async (formData: FormData): Promise<TApiResponse> => {
			const values = LoginFormSchema.parse(Object.fromEntries(formData));

			return await get().handleRequest(async () => {
				const response = await graphqlService.mutate(LOGIN_MUTATION, {
					loginInput: {
						email: values.email || "",
						password: values.password || "",
					},
				});

				if (response && response.status && response.data) {
					set({ userAuth: response.data.user });

					if (response.data.accessToken) {
						localStorage.setItem("token", response.data.accessToken);
					}

					toast.success("Đăng nhập thành công!");

					return { status: true, data: response.data };
				}

				return response;
			});
		},

		reset: () => {
			set({ ...initialState });
			usePostStore.getState().reset();
		},
	})
);