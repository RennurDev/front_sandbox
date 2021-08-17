import { useState } from "react";
import { HowToPlay } from "./HowToPlay";
import { Notifications } from "./Notifications";

export const ModalWindow = () => {
  const [content, setContent] = useState("how_to_play");
  const Modal = ({ content }) => {
    if (content === "how_to_play") {
      return <HowToPlay setContent={setContent} />;
    } else if (content === "notifications") {
      return <Notifications setContent={setContent} />;
    } else {
      //none
      return <div />;
    }
  };

  return (
    <div>
      <Modal content={content} />
    </div>
  );
};
