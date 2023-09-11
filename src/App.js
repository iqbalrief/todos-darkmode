import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todos from "./pages/todos";

function App() {
  return (
<BrowserRouter>
    <Routes>
      <Route element={<Todos />} path='/' />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
