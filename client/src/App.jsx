import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import AboutCards from "./components/AboutUs/AboutCards";

function App() {
  
  return (

    <div>

      <NavBar/>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path ="/conocenos" element= { <AboutCards/>}/>

      </Routes>
    <Footer/>
    </div>

  );
}

export default App;
