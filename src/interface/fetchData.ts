export interface FetchResult<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  sendRequest: (url: string, method?: string, body?: T) => Promise<void>;
}
