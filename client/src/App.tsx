import { BrowserRouter, Route, Routes } from 'react-router-dom'
import IsNotLogged from './outlets/isNotLogged'
import Home from './routes/Home'
import LoginForm from './routes/LoginForm'
import RegisterForm from './routes/RegisterForm'
import GoogleFallback from './routes/GoogleFallback'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<IsNotLogged />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>

        <Route path="google-fallback" element={<GoogleFallback />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
