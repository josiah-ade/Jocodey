
export function handleError(err: unknown, showError: (msg: string) => void) {
    const error = err as { message?: string; code?: string };
  
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      showError("No internet connection. Please check your network.");
      return;
    }
  
    if (error.code === "ERR_NETWORK") {
      showError("Network error. Please check your connection.");
      return;
    }
  
    if (error.message?.includes("Failed to fetch")) {
      showError("Network error. Please check your connection.");
      return;
    }
  
    showError(error.message || "Something went wrong. Please try again.");
  }
  