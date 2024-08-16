import LandingPage from "./LandingPage";
import "../css/App.css"
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="site">
      <Routes>
        <Route path='/' element={<LandingPage />}/>
      </Routes>
    </div>
  );
}

export default App;
