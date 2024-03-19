import './App.css';
import './style.css';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { About } from './components/About';
import NoteState from './context/notes/Notestate';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import SignUp from './components/auth/Sign_up';
import Login from './components/auth/login';

export default function App() {
  const [theme, setTheme] = useState('light')
  // const value = useContext(noteContext)
  function Checked(){
    const checkbox = document.getElementsByClassName('checkbox')[0]
    if(checkbox.checked){
      document.body.style.backgroundColor ="#36454F"
      document.body.style.color = "white"
      // value.update('dark')
      setTheme('dark')
      
    }
    else{
      document.body.style.backgroundColor ="white"
      document.body.style.color = "black"
      // value.update('dark')
      setTheme('light')
    }
  }
  return (
    <>
    <NoteState>
      <Router>
        <Navbar title={`iNoteBook`} onClick={Checked} theme={theme}/>
        {/* <div className='container'> */}
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route exact path='/about' element={<About/>}/>
          <Route exact path='/sign_up' element={<SignUp/>} />
          <Route exact path='/login' element={<Login />}  />
        </Routes>
        {/* </div> */}
      </Router>
    </NoteState>  
    </>
  )

}