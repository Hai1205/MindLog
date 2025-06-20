import axiosInstance from "./axiosInstance";
import { print } from "graphql";
import { DocumentNode } from "graphql";
import { toast } from "react-toastify";

export class GraphQLService {
    private endpoint: string;

    constructor(endpoint = "/graphql") {
        this.endpoint = endpoint;
    }

    async query(
        query: DocumentNode | string,
        variables: Variables = {}
    ): Promise<TApiResponse> {
        try {
            const queryString = typeof query === "string" ? query : print(query);

            const response = await axiosInstance.post(this.endpoint, {
                query: queryString,
                variables
            });

            if (response.data.errors) {
                const errorMessage = response.data.errors.map((e: { message: string }) => e.message).join("\n");
                return {
                    status: false,
                    data: null,
                    error: errorMessage
                };
            }

            return {
                status: true,
                data: response.data.data
            };
        } catch (error: unknown) {
            const errorMessage = (error as { response?: { data?: { message?: string } } }).response?.data?.message || (error as Error).message || "Lỗi khi gửi yêu cầu GraphQL";
            return {
                status: false,
                data: null,
                error: errorMessage
            };
        }
    }

    async mutate(
        mutation: DocumentNode | string,
        variables: Variables = {},
        options: { showToast?: boolean } = { showToast: true }
    ): Promise<TApiResponse> {
        const result = await this.query(mutation, variables);

        if (result && !result.status && options.showToast && result.error) {
            toast.error(result.error);
        }

        return result;
    }
}

export const graphqlService = new GraphQLService();

export function useGraphQL() {
    return {
        query: graphqlService.query.bind(graphqlService),
        mutate: graphqlService.mutate.bind(graphqlService),
    };
} 