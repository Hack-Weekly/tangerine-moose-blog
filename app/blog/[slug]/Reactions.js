import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { VscReactions as AddReactionIcon } from "react-icons/vsc";

import TextButton from "./TextButton";
import styles from "./page.module.css";

const Reactions = ({ reactions }) => {
  const addReaction = (emoji) => (emoji in reactions ? (reactions[emoji] += 1) : (reactions[emoji] = 1));
  const [showPicker, setShowPicker] = useState(false);
  const togglePicker = () => setShowPicker(!showPicker);

  return (
    <div className={styles.buttons}>
      {Object.keys(reactions).map((objectKey, index) => (
        <div key={index}>
          {objectKey} {reactions[objectKey]}
        </div>
      ))}
      <div key="new-react">
        <TextButton onClick={togglePicker}>
          <AddReactionIcon size={22} />
        </TextButton>
        {showPicker && (
          // TODO: fix weird positioning/size
          <div style={{ position: "absolute" }}>
            <EmojiPicker
              theme="auto"
              emojiStyle="native"
              onEmojiClick={(e) => {
                togglePicker();
                addReaction(e.emoji);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Reactions;
