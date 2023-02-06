import {Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import MainPage from './pages/MainPage/MainPage';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import './utils/style_initialize.css';


function App() {
  return (
    <Router>
      <Routes>
		    <Route path='/' element={<WelcomePage/>}/>
        <Route path='/main' element={<MainPage/>}/>
      </Routes>
    </Router>
  )
}

export default App;
