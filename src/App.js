import "./App.css";
import { Download } from "./routes/Download";
import { PageNotFound } from "./routes/PageNotFound";
import { Upload } from "./routes/Upload";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/d/:fileId" element={<Download />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
