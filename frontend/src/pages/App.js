import LandingPage from "./LandingPage";
import "../css/App.css"
import { Routes, Route, Navigate } from "react-router-dom";
import CreateSimulation from "./CreateSimulation";
import CountryPop from "./CountryPop";
import PageNotFound from "./PageNotFound";

function App() {
  return (
    <div className="site">
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace/>} />
        <Route path='/home' element={<LandingPage />}/>
        <Route path='/create' element={<CreateSimulation />}/>
        <Route path='/population' element={<CountryPop />}/>
        <Route path='*' element={<PageNotFound />}/>
      </Routes>
    </div>
  );
}

export default App;
