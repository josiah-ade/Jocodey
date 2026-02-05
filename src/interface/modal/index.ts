


export interface ModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export interface ModalStateTableImage {
  isOpen: boolean;
  url: string;
  setUrl: (url: string) => void;
  close: () => void;
  toggle: () => void;
}

export interface ModalStateTableDelete {
  isOpen: boolean;
  id: string;
  name: string;
  apiPath: string;
  setItem: (id: string, apiPath: string, name?: string) => void;
  close: () => void;
  toggle: () => void;
}
