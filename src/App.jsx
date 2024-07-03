import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./routes/Login";
import Register from "./routes/Register";

function App() {
  return (
    <div className="">

    <Routes>
      <Route path="/" element={<div className="flex justify-center items-center bg-register h-screen w-screen">Hello Penpal here</div>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </div>
  );
}

export default App;
