export interface INote {
  _id?: string | null;
  title: string;
  content: string;
  favorite: boolean;
  trash: boolean;
  author: string;
  createdAt: string;
  updatedAt: string;
}
