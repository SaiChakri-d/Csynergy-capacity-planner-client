import React, { useEffect, useState, useContext } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import UserContext from "../../UserContext";
const TextEditor = ({ height }) => {
  let context = useContext(UserContext);
  const { quill, quillRef } = useQuill();
  const { value, setValue } = useContext(UserContext);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setValue(quill.getText());
      });
    }
  }, [quill]);

  return (
    <div>
      <div style={{ width: "100%", height: `${height}vh` }}>
        <div ref={quillRef} />
      </div>
    </div>
  );
};

export default TextEditor;
