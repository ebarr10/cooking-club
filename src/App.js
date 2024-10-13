import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Week from "./routes/week/week.component";
import Upload from "./routes/upload/upload.component";
import "./App.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/week/:id/:theme" element={<Week />} />
        <Route path="/upload/:id" element={<Upload />} />
      </Route>
    </Routes>
  );
}

export default App;
