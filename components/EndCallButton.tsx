import { FC } from "react";

const EndCallButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 px-4 bg-red-500 text-white rounded-lg"
    >
      End Call
    </button>
  );
};

export default EndCallButton;