import { Navigate, Outlet } from 'react-router-dom'
import './App.css'
import { useUser } from '@clerk/clerk-react'
import Header from './components/custom/Header'
import { Toaster } from 'sonner'



function App() {
  // user,
const {isLoaded,isSignedIn} = useUser()

if(!isSignedIn&& isLoaded){
  return <Navigate to={"/auth/sign-in"}/>
}

  return (
    <div>
      <Header />
      <Outlet />
      <Toaster />
    </div>
  )
}

export default App
