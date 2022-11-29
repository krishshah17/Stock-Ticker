
import React from "react"
import {useState} from "react"
import {useEffect} from 'react';
import "./style.css"
function Cards(prop) {
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

export default Cards;