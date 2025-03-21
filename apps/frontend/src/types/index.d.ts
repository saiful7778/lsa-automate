export interface ApiResponse<TData> {
  success: boolean;
  stateCode: number;
  message?: string | undefined;
  data?: TData | undefined;
}
