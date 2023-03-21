import { Routes, Route } from "react-router-dom";
import './App.css'
import NavBar from "./components/NavBar/NavBar";

function App() {

  return (
    <div className="App">

    <NavBar/>
     <h2>Soy el Home</h2>

     <Routes>
        <Route path="/prueba" element={<NavBar />} />
      </Routes>

    </div>
  )
}

export default App
