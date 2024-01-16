import React from 'react'
import {createRoot} from 'react-dom/client'
import '../css/index.css'
import HomePage from './HomePageComponents/HomePage'

const App = () => {
  return (
    <div className='center'>
      <HomePage/>
    </div>
  )
}

const appDiv = document.getElementById('root');
const root = createRoot(appDiv)
root.render(<App />)