import React from 'react'
import Home from './Home'
import { Route, Routes } from 'react-router-dom'
import Ques from './Ques'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:id' element={<Ques />} />
      </Routes>
    </div>
  )
}

export default App