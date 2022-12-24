import React from "react";
import { BsBell } from "react-icons/bs";
import { formatDistance } from "date-fns";
import { Note } from "../types";

interface IPreviewCardProps {
  note: Note;
}

const PreviewCard = ({ note }: IPreviewCardProps) => {
  const dateCreated = formatDistance(new Date(note.createdAt), new Date(), {
    addSuffix: true,
  });

  return (
    <div className="relative px-1 py-2 ml-5 space-y-1 rounded-sm hover:bg-gray-700 cursor-pointer hover:border hover:border-gray-600">
      <span className="block absolute -left-5 top-4 w-2.5 h-2.5 bg-orange-500 rounded-full items-center"></span>
      <h3 className="font-semibold text-sm">{note.title}</h3>
      <div
        dangerouslySetInnerHTML={{ __html: note.content }}
        className="text-sm text-gray-600 font-semibold truncate"
      ></div>
      <div className="flex text-xs items-center font-semibold bg-blue-500/20 w-fit px-2 py-1 rounded-full">
        {dateCreated}
      </div>
    </div>
  );
};

export default PreviewCard;
