import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Registrar from "./pages/Registrar";

export default function App() {
  return (
    <BrowserRouter basename="/encontre-seu-amigo">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registrar" element={<Registrar />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
