import{
  BrowserRouter as Router,
  Route,
  Routes,
  
} from "react-router-dom"
import Layout from "./Layout"
import Register from "./pages/Register"

function App() {

  return (
    <Router>
      <Routes>
        <Route path = "/" element={
          <Layout>
              
          </Layout>
        }>
        </Route>

        <Route path="/register" element={
         <Register/>
        }>

        </Route>
      </Routes>
    </Router>
  )
}

export default App
