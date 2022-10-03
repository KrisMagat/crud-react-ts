import { useState } from 'react'
import './App.css'
import Input from './components/Input'
import Display from './components/Display'


function App() {
  const [runs, setRuns] = useState(null)

  return (
    <div className="App">
      <Input />
      <Display />
    </div>
  )
}

export default App;
