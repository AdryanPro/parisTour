import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import Privatisation from './pages/Privatisation'
import Error from './pages/Error'
import Versailles from './pages/Versailles'
import Bruges from './pages/Bruges'
import Mont from './pages/Mont'
import Dday from './pages/Dday'
import NavBar from './Layout/NavBar'
import Footer from './Layout/Footer'
import  Contact  from './pages/Contact'
import Condition from './pages/Condition'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/nav' element={<NavBar />}/>
        <Route path='/Versailles' element={<Versailles />}/>
        <Route path='/Contact' element={<Contact />}/>
        <Route path='/Bruges' element={<Bruges />}/>
        <Route path='/Mont-Saint-Michel' element={<Mont />}/>
        <Route path='/D-Day' element={<Dday />}/>
        <Route path='/Privatisation' element={<Privatisation />}/>
        <Route path='/Conditions-Generales' element={<Condition />}/>
        <Route path='*' element={<Error />}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
