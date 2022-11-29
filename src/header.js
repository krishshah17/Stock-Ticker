import React from "react"

let Header = ()=>{
	var divstyle={
			padding: 50,
    		backgroundColor: "black",
    		height:8,
    		textAlign: "center"
		}
	var h1style={
		color:"#EA71E7"
	}
		return(
		<div style={divstyle}>
				<h1 style={h1style}>OnePlace</h1>
			</div>


		)
}

export default Header;