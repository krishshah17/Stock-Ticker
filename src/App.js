import React from "react"
import {BrowserRouter,Route,Routes,Link} from "react-router-dom";
import "./style.css"
import Header from "./header.js"
import Footer from "./footer.js"
import SearchBar from "./SearchBar.js"
import Cards from "./Cards.js"
class App extends React.Component {
  

  render()
  { var divstyle={
      padding: 50,
        backgroundColor: "black",
        height:"100vh",
        textAlign: "center"
    }
    return(
      <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<><Header/><SearchBar/><Footer/></>}/>
            <Route exact path="/nextroute" element={<><Header/><Cards/><Footer/></>}/>
        </Routes>
      </BrowserRouter>
      
      );
  }
}

export default App
