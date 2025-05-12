import { BrowserRouter, Route, Routes } from 'react-router-dom'
import IsNotLogged from './outlets/isNotLogged'
import Home from './routes/Home'
import LoginForm from './routes/LoginForm'
import RegisterForm from './routes/RegisterForm'
import Fallback from './routes/Fallback'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<IsNotLogged />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>

        <Route path="fallback" element={<Fallback />} />
        <Route path="*" element={<h3>Blank page</h3>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
