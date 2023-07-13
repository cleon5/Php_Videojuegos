import logo from './logo.svg';
import './App.css';
import {  BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Form from "./pages/Form";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Form" element={<Form />} />
      <Route path="/Form/:id" element={<Form />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
