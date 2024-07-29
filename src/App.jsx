import Pokedex from './Components/Pokedex/Pokedex'
import './App.css'
import CustomRoutes from './routes/CustomRoutes'
import { Link } from 'react-router-dom'

function App() {  

  return (
    <>
    <Link to="/">
      <h1 className="pokedex-heading">Pokedex</h1>
    </Link>
    <CustomRoutes/>
    </>
  )
}

export default App
