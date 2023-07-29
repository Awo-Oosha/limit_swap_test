import './App.css';
import Homepage from './components/Homepage';
import MainApp from './components/MainApp';
import Footer from './components/Footer';
import { Routes, Route  } from 'react-router-dom';

function App() {
  return (
    <div className='App'>


      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/app' element={<MainApp />} />
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;
