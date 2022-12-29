import React from "react";
import { BsBell } from "react-icons/bs";
import { formatDistance } from "date-fns";
import { INote } from "../types";
import Link from "next/link";

interface IPreviewCardProps {
  note: INote;
}

const PreviewCard = ({ note }: IPreviewCardProps) => {
  const dateCreated = formatDistance(new Date(note.createdAt), new Date(), {
    addSuffix: true,
  });

  return (
    <Link href={`/notes/${note._id}`}>
      <div className="relative px-1 py-2 ml-5 space-y-1 rounded-sm hover:bg-gray-700 cursor-pointer hover:border hover:border-gray-600">
        <span className="block absolute -left-5 top-4 w-2.5 h-2.5 bg-orange-500 rounded-full items-center"></span>
        <h3 className="font-semibold text-sm">{note.title}</h3>
        <div className="text-sm max-h-7 text-gray-600 font-semibold truncate">
          <p dangerouslySetInnerHTML={{ __html: note.content }}></p>
        </div>
        <div className="flex text-xs items-center font-semibold bg-blue-500/20 w-fit px-2 py-1 rounded-full">
          {dateCreated}
        </div>
      </div>
    </Link>
  );
};

export default PreviewCard;
