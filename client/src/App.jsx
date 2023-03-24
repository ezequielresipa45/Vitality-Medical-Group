import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

function App() {
  
  return (

    <div>

      <NavBar/>

      <Routes>

        <Route path="/" element={<Home />} />

      </Routes>
    <Footer/>
    </div>

  );
}

export default App;
