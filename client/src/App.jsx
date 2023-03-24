import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Institutional from "./components/Institutional/Institutional";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

function App() {
  
  return (

    <div>

      <NavBar/>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/Institucional" element={<Institutional />} />
      </Routes>
    <Footer/>
    </div>

  );
}

export default App;
