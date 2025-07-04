import{
  BrowserRouter as Router,
  Route,
  Routes,
  
} from "react-router-dom"
import Layout from "./Layout"
import Register from "./pages/Register"
import LogIn from "./pages/LogIn"

function App() {

  return (
    <Router>
      <Routes>
        <Route path = "/" element={
          <Layout>
              <p>
                Home Page
              </p>
          </Layout>
        }>
        </Route>

        <Route path="/register" element={
         <Layout>
              <Register/>
          </Layout>
        }>
        </Route>

        <Route path="/log-in" element={
          <Layout>
            <LogIn/>
          </Layout>
        }>

        </Route>

       
      </Routes>
    </Router>
  )
}

export default App
