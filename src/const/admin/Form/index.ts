type Option = string | { label: string; value: string };

export interface FormProps {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  options?: Option[];
  fullWidth?: boolean;
  section?: string;
  hidden?: boolean;
  min?: number;
  readonly?: boolean;
  defaultValue?: string;
}
