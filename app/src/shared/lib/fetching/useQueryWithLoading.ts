"use client"
import { useEffect } from 'react';
import { useAppDispatch } from '@/shared/model/store/hooks';
import { setIsLoading } from '@/shared/model/store/reducers/uiReducer';

type QueryHookResult<T> = {
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error?: any;
  data?: T;
  [key: string]: any;
};

export const useQueryWithLoading = <T>(
  queryHook: () => QueryHookResult<T>,
  options?: {
    skip?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (error: any) => void;
  }
) => {
  const dispatch = useAppDispatch();
  const result = queryHook();

  useEffect(() => {
    if (options?.skip) {
      dispatch(setIsLoading(false));
      return;
    }

    const isLoading = result.isLoading || result.isFetching;
    dispatch(setIsLoading(isLoading));

    if (!isLoading) {
      if (result.isError && options?.onError) {
        options.onError(result.error);
      } else if (result.data && options?.onSuccess) {
        options.onSuccess(result.data);
      }
    }
  }, [result.isLoading, result.isFetching, result.isError, result.data, dispatch, options]);

  return result;
}; 