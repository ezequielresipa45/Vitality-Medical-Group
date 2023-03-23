import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (

    <div className="App">

      {/* <NavBar/> */} {/* Ojo la nav deberia renderizarse aca no dentro del Home/Header, si no no se va a ver en el resto de las vistas */}

      <Routes>

        <Route path="/" element={<Home />} />

      </Routes>

    </div>
  );
}

export default App;
