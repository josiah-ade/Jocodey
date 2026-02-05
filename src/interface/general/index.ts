export interface generalState {
  currentRoute: string | null;
  lastRoute: string | null;
  setRoute: (route: string) => void;
  resetRoutes: () => void;
}
