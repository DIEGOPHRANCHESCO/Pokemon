import { Route } from "react-router-dom";
import Navbar from "./Components/Navbar/navbar";
import { Home, Create, Detail, Landing } from "./Views";
import { useLocation } from "react-router-dom"
import axios from "axios";
axios.defaults.baseURL = 'https://pokemons-production.up.railway.app/';



function App() {
const Location = useLocation()


return (
  <div className="App">
      {Location.pathname !== "/" &&   <Navbar /> }
    
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/detail/:id" component={Detail } />
      <Route excat path="/create" component={Create} />
      
    </div>
  );
}

export default App;
