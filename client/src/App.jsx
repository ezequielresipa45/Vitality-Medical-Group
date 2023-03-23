import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";

function App() {
  
  return (

    <div>

      <NavBar/>

      <Routes>

        <Route path="/" element={<Home />} />

      </Routes>

    </div>

  );
}

export default App;
