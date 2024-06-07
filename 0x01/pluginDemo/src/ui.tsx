import ReactDOM from "react-dom/client";
import "./style.css";
import { BrowserRouter, redirect, Route, Routes } from "react-router-dom";

import Create from "./pluginUi/pages/create";
import KeepAlive from "./pluginUi/component/KeepAlive";
import Action from "./pluginUi/pages/action";

const UI = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"}  element={<KeepAlive />}>
          <Route index element={<Create />} />
          <Route path="/create" element={<Create />} />
          <Route path="/action" element={<Action />} />
          {/* <Route path="/action" element={<Action />} />
            <Route path="/mintNft" element={<EditNft />} />
            <Route path="/canvas" element={<Canvas />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/previewNft" element={<MintNft />} /> */}
          <Route path="*" element={<Create />} />
        </Route>

      </Routes>


    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("react-page")).render(<UI />);
