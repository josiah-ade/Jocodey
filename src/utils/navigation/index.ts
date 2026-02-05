import NProgress from "nprogress";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function navigateWithProgress(router: AppRouterInstance, url: string) {
  NProgress.start();
  router.push(url);
}
