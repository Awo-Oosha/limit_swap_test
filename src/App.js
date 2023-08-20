import './App.css';
import Footer from './components/Footer';
import Homepage from "./components/Homepage";
import App_Launch from "./components/App_Launch";
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path = '/' element = {<Homepage  />} />
            <Route path = '/launch'  element = {<App_Launch />}/>
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
