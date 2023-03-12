import { useState } from 'react';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import MainPage from './pages/MainPage/MainPage';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import PostPage from './pages/PostPage/PostPage';
import CreatePage from './pages/CreatePage/CreatePage';
import './utils/style_initialize.css';
import AppContext from './AppContext';

const queryClient = new QueryClient()

function App() {
  const [isSidebarVisible, setSidebarVisible] = useState<boolean>(false);


  const contextRef = {
    context_sidebar: {
      hide: ()=>setSidebarVisible(false),
      show:()=>setSidebarVisible(true),
      visibility: isSidebarVisible
    }
  }


  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={contextRef}>
      <Router>
        <Routes>
            <Route path='/' element={<WelcomePage/>}/>
            <Route path='/main' element={<MainPage/>}/>
            <Route path='/post/:id' element={<PostPage/>}/>
            <Route path='/create' element={<CreatePage/>}/>
        </Routes>
      </Router>
      </AppContext.Provider>
    </QueryClientProvider>
  )
}

export default App;
