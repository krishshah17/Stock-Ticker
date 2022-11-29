import React from "react"
import {useState} from "react"
import {useEffect} from 'react';
import Cards from "./Cards.js"
import {BrowserRouter as Router,Route,Routes,Link, useNavigate } from "react-router-dom";
import "./style.css"
function Card(prop) {
  const [state,setstate]=useState(null)
  useEffect(()=>{
    setstate(prop.jsondata)
  },[state])
  return (
    <div>
    {
      state !== null?(
        <div>
          <h1 className="h1style">{prop.jsondata}</h1>
        </div>
        ):(<></>
        )

    }
    
    </div>
  );
}
const SearchBar = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState('');
  // var curprice=-9999;
  const [data, setData] = useState(null)
  const [flag,setFlag] = useState(false)
  const handleChange = event => {
    setMessage(event.target.value);

    //console.log('value is:', event.target.value);
  };

  const handleClick =()=>
  {   
      
      fetch('http://localhost:5000/api/'+message)
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            setData(data)
         })
         .catch((err) => {
            console.log(err.message);
         });
        setFlag(true)
  }

    return (
      <>
    <div className="divClass">
      <input
        type="text"
        placeholder="Enter Ticker"
        name="symbol"
        onChange={handleChange}
        value={message}
        className="textbox"
      />
      <input
        type="button"
        value="Get Value"
        onClick={handleClick}
        className="button"     
      />
    </div>
    <div>
    {
        data!== null?(
        <div className="Card">
          <h1 className="h1style">The Stock Name is {data.name}</h1>
          <h1 className="h1style">The curent price of 1 stock is ${data.price}</h1>
          <h1 className="h1style">The percentage change of today is {data.changesPercentage}</h1>
          <h1 className="h1style">Todays low is ${data.dayLow}</h1>
          <h1 className="h1style">Todays high is ${data.dayHigh}</h1>
          <h1 className="h1style">Year low is ${data.yearLow}</h1>
          <h1 className="h1style">Year high is ${data.yearHigh}</h1>
        </div>
        ):(<>we have lin</>
        )
    }
    </div>
    </>
    );

};

export default SearchBar;