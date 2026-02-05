import { ForwardRefExoticComponent, SVGProps } from "react";

export interface AdminSideBarProps {
  title: string;
  link: string;
  icon: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
}
