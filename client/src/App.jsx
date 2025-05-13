
import './App.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Contact from './pages/contact/Contact'
import Photos from './pages/photos/Photos'
import Dashboard from './pages/dashboard/Dashboard'
import PostArt from './pages/post-art/PostArt'
import AboutUs from './pages/about-us/AboutUs'

const router = createBrowserRouter([
  {
    path : "/",
    element :<Home/>
  },
  {
    path : "/login",
    element :<Login/>
  },
  {
    path : "/signup",
    element : <Signup/>
  },
  {
    path : "/contact",
    element : <Contact/>
  },
  {
    path : "/photos",
    element : <Photos/>
  },
  {
    path : "/dashboard",
    element : <Dashboard/>
  },
  {
    path : "/about-us",
    element : <AboutUs/>
  },
  {
    path : "/post-art",
    element : <PostArt/>
  },
])

const App = () => {
  return (
    <>
<RouterProvider router = {router}/>
{/* <Toaster /> */}
    </>
  )
}

export default App