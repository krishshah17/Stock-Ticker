const express=require("express");
const http = require("http");
const qs = require("querystring");
const MongoClient=require("mongodb").MongoClient
const url = require("url");
const dburl="mongodb://localhost:27017/"
const exphbs=require("express-handlebars")
const cors=require("cors")
const reqs=require("request")
// api key for fmpcloud: 62b146cb82a0127b95f4f10abb92025b
// documentation for minute wise: https://fmpcloud.io/api/v3/historical-chart/1min/AAPL?apikey=62b146cb82a0127b95f4f10abb92025b
//api key for alphvantage: X3VF6U4PQQ663TM4
// api call for alphavantage:

const today = new Date().toLocaleDateString()
// console.log(today)
var sym='';
const app=express();
app.use(cors())
app.use(express.json())

app.get("/api",function(request,response)
{
	response.send("insert ticker after api/")
	
})

app.get("/api/:ticker",function(request,response)
{
	MongoClient.connect(dburl,function(err,client)
	{ sym=request.params.ticker
		if (err) throw err;
		const db=client.db("Stocks")
		const dbco=db.collection("StockMarket")
		db.collection("StockMarket").find({"symbol":request.params.ticker}).toArray(function(req,objs)
		{	//console.log({"symbol":request.params.ticker})
			if(objs.length==0)
			{
				reqs("https://fmpcloud.io/api/v3/quote/"+request.params.ticker+"?apikey=62b146cb82a0127b95f4f10abb92025b", function (error, res, body)
				{
				  	body=body.slice(1,-1);
				  	const data=JSON.parse(body);
				  	data["date"]=today;
				  	dbco.insertOne(data);
				  	response.send(data);//to send just json
				  	//response.send(objs[0].price);to send to front end
					//response.send("Current price for "+data["name"]+" is :"+data["price"])
				  	
				});
			}
			else
			{	
				
				datadate=objs[0].date;
				if(datadate!=today)
				{
					dbco.deleteOne({"symbol":request.params.ticker})
					reqs("https://fmpcloud.io/api/v3/quote/"+request.params.ticker+"?apikey=62b146cb82a0127b95f4f10abb92025b", function (error, res, body)
					{
					  	body=body.slice(1,-1);
					  	const data=JSON.parse(body);
					  	data["date"]=today;
					  	dbco.insertOne(data);
					  	response.send(data);//to send just json
					  	//console.log(data)
					  	//response.send(objs[0].price);to send to front end
						//response.send("Current price for "+data["name"]+" is :"+data["price"])
					  	
					});

				}
				else
				{
					response.send(objs[0]);//to send to front end
					//console.log(objs[0])
					//response.send("Current price for "+objs[0].name+" is :"+objs[0].price)
				}
			}
		})
	})
})

app.get("http://localhost:3000/")

app.listen(5000,()=>
{
	console.log("Server is running on port 5000")
})