export interface INote {
  _id?: string | null;
  title: string;
  content: string;
  favorite: boolean;
  trash: boolean;
  createdAt: string;
  updatedAt: string;
}
