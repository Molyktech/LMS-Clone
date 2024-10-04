import { Routes, Route } from "react-router-dom";
import {Home, Auth} from "./pages";


function App() {

  return (
    <Routes>
      <Route
        path="/"
        element={<Home/>}
      />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
