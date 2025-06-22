import{
  BrowserRouter as Router,
  Route,
  Routes,
  
} from "react-router-dom"
import Layout from "./Layout"

function App() {

  return (
    <Router>
      <Routes>
        <Route path = "/" element={
          <Layout>
            
          </Layout>
        }>

        </Route>
      </Routes>
    </Router>
  )
}

export default App
