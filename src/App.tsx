import {Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import MainPage from './pages/MainPage/MainPage';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import PostPage from './pages/PostPage/PostPage'
import './utils/style_initialize.css';


function App() {
  return (
    <Router>
      <Routes>
		    <Route path='/' element={<WelcomePage/>}/>
        <Route path='/main' element={<MainPage/>}/>
        <Route path='/post/:id' element={<PostPage/>}/>
      </Routes>
    </Router>
  )
}

export default App;
