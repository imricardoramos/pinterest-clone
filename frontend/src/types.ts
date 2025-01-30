export type Board = {
  id: string;
  name: string;
  description: string;
  cover: string;
  author: User;
  pins: Pin[];
  total_pins: number;
};
export type User = {
  id: string;
  name: string;
  display_name: string;
  username: string;
  email: string;
  avatar: string;
  boards: Board[];
  total_followers: number;
  total_following: number;
  following: User[];
  is_following: boolean;
};
export type Pin = {
  id: string;
  title: string;
  description: string;
  link: string;
  author: User;
  image: string;
};

export type Paginated<T> = {
  results: T;
  next: boolean;
};
