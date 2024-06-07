// import React from "react";
// import ReactDOM from "react-dom";
// import { Typography, Input, Button } from "antd";
// import { CopyToClipboard } from "react-copy-to-clipboard";

// export default function copyToClipboard() {
//   return <div>Image</div>;
// }

import { Input } from "antd";
import { useState } from "react";

function Example() {
  const [pasteData, setPasteData] = useState("");

  const handlePaste = (e) => {
    setPasteData(e.clipboardData.getData("Text"));
  };

  const paste = async () => {
    const data = await navigator.clipboard.readText();
    console.log("====paste=====", data);
  };

  return (
    <div>
      <Input onPaste={handlePaste} placeholder="在此处粘贴" />
      <div onClick={paste}>点击粘贴</div>
    </div>
  );
}

export default Example;
