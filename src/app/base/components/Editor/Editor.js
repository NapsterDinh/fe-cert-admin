import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "./styles.css";

export const Editor = (props) => {
  return (
    <div className="text-editor">
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        {...props}
        value={props.value || ""}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;
