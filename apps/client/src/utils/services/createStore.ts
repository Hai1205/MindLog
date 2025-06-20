import { toast } from "react-toastify";
import { create } from "zustand";
import { persist, createJSONStorage, PersistOptions } from "zustand/middleware";

export interface BaseStore {
    isLoading: boolean;
    error: string | null;
    status: number;
    message: string | null;

    handleRequest: <R>(apiCall: () => Promise<R>) => Promise<R>;
    reset: () => void;
}

export const baseInitialState = {
    isLoading: false,
    error: null,
    status: 0,
    message: null,
};

export function createStore<T extends BaseStore, U = Variables>(
    storeName: string,
    initialState: Variables,
    storeActions: (
        set: (state: Partial<T>) => void,
        get: () => T
    ) => U,
    persistOptions?: Partial<PersistOptions<T>>
) {
    return create<T>()(
        persist(
            (set, get) => {
                const handleRequest = async <R>(
                    apiCall: () => Promise<R>
                ): Promise<R> => {
                    set({ isLoading: true, error: null } as T);

                    try {
                        return await apiCall();
                    } catch (error: unknown) {
                        console.error(error);
                        const message = (error as { response?: { data?: { message?: string } } }).response?.data?.message || (error as Error).message;
                        set({ error: message } as T);

                        if (message) {
                            toast.error(message);
                        }
                        throw error;
                    } finally {
                        set({ isLoading: false } as T);
                    }
                };

                const reset = () => {
                    set({ ...baseInitialState, ...initialState } as T);
                };

                return {
                    ...baseInitialState,
                    ...initialState,
                    ...storeActions(
                        (state) => set(state as T),
                        get as () => T
                    ),
                    handleRequest,
                    reset,
                } as unknown as T;
            },
            {
                name: `${storeName}-storage`,
                storage: createJSONStorage<T>(() => sessionStorage),
                ...persistOptions,
            }
        )
    );
} 