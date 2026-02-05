export type ActionResponse<T = unknown> =
  | {
      success: true;
      data: T;
      message: string;
    }
  | {
      success: false;
      message: string;
    };

export function buildSuccessResponse<T>(
  data: T,
  message = "Success"
): ActionResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

export function buildErrorResponse<T = never>(
  message = "An error occurred"
): ActionResponse<T> {
  return {
    success: false,
    message,
  };
}
