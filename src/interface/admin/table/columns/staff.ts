export interface staffColumnProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  gender: string;
  position: string;
}

export interface staffDataProps {
  data: staffColumnProps[];
}
