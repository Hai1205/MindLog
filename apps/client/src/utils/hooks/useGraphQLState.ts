import { useState, useCallback } from "react";
import { graphqlService, ApiResponse } from "../services/graphql";
import { DocumentNode } from "graphql";

type GraphQLStateOptions = {
  showToast?: boolean;
  clearOnSuccess?: boolean;
};

export function useGraphQLState<T, V = Record<string, unknown>>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const mutate = useCallback(
    async (
      mutation: DocumentNode | string,
      variables?: V,
      options: GraphQLStateOptions = { showToast: true, clearOnSuccess: true }
    ) => {
      setLoading(true);
      setError(null);

      const response = await graphqlService.mutate<T>(
        mutation,
        variables || {},
        { showToast: options.showToast }
      );

      setLoading(false);

      if (!response.success) {
        setError(response.error || "Có lỗi xảy ra");
        return response;
      }

      if (options.clearOnSuccess) {
        setData(response.data);
      }

      return response;
    },
    []
  );

  const query = useCallback(
    async (
      query: DocumentNode | string,
      variables?: V,
      options: GraphQLStateOptions = { showToast: false }
    ) => {
      setLoading(true);
      setError(null);

      const response = await graphqlService.query<T>(query, variables || {});

      setLoading(false);

      if (!response.success) {
        setError(response.error || "Có lỗi xảy ra");
        if (options.showToast) {
          // toast error is already handled in graphqlService
        }
        return response;
      }

      setData(response.data);
      return response;
    },
    []
  );

  const resetState = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    loading,
    error,
    data,
    mutate,
    query,
    resetState,
  };
}

export function createGraphQLAction<T, V = Record<string, unknown>>(
  mutation: DocumentNode | string,
  setLoadingFn: (loading: boolean) => void,
  setErrorFn: (error: string | null) => void,
  options: GraphQLStateOptions = { showToast: true }
) {
  return async (variables?: V): Promise<ApiResponse<T>> => {
    setLoadingFn(true);
    setErrorFn(null);

    const response = await graphqlService.mutate<T>(
      mutation,
      variables || {},
      options
    );

    setLoadingFn(false);

    if (!response.success) {
      setErrorFn(response.error || "Có lỗi xảy ra");
    }

    return response;
  };
} 