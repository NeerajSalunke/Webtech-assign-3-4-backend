const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
// const port = 3000;
const port = process.env.PORT || 3000;
const path = require(`path`);

const { MongoClient, ServerApiVersion } = require('mongodb');
var multer = require('multer')
const uri = "mongodb+srv://nsalunke:JyVkQmTVSesrVHyn@cluster0.wgcrm0q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

app.use(express.json());
app.use(cors());

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '/dist/stock-market/index.html'));
//   });


app.get('/search/profile', (req, res) => {
    const tickerSymbol = req.query.ticker;
    // console.log(tickerSymbol)
    const apiKey = "cmt29n9r01qpvcptjrdgcmt29n9r01qpvcptjre0";
    axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${tickerSymbol}&token=${apiKey}`)
       .then(response1 => {
        //    console.log(response1.data);
           res.json(response1.data);
       })
       .catch(error => {
           res.status(500).json({ error: error.message });
       });
});

app.get('/search/autocomplete', (req, res) => {
    const tickerSymbol = req.query.ticker;
    // console.log(tickerSymbol)
    const apiKey = "cmt29n9r01qpvcptjrdgcmt29n9r01qpvcptjre0";
    axios.get(`https://finnhub.io/api/v1/search?q=${tickerSymbol}&token=${apiKey}`)
       .then(response1 => {
        //    console.log(response1.data);
           res.json(response1.data);
       })
       .catch(error => {
           res.status(500).json({ error: error.message });
       });
});

app.get('/search/quote', (req, res) => {
    const tickerSymbol = req.query.ticker;
    // console.log(tickerSymbol)
    const apiKey = "cmt29n9r01qpvcptjrdgcmt29n9r01qpvcptjre0";
    
    axios.get(`https://finnhub.io/api/v1/quote?symbol=${tickerSymbol}&token=${apiKey}`)
        .then(response2 => {
            // console.log(response2.data);
            res.json(response2.data);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

app.get('/search/peers', (req, res) => {
    const tickerSymbol = req.query.ticker;
    // console.log(tickerSymbol)
    const apiKey = "cmt29n9r01qpvcptjrdgcmt29n9r01qpvcptjre0";
    
    axios.get(`https://finnhub.io/api/v1/stock/peers?symbol=${tickerSymbol}&token=${apiKey}`)
        .then(response => {
            // console.log(response.data);
            res.json(response.data);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

app.get('/search/insights/insiderSentiments', (req, res) => {
    const tickerSymbol = req.query.ticker;
    // console.log(tickerSymbol)
    const apiKey = "cmt29n9r01qpvcptjrdgcmt29n9r01qpvcptjre0";
    
    axios.get(`https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${tickerSymbol}&from=2022-01-01&token=${apiKey}`)
        .then(response => {
            // console.log(response.data);
            res.json(response.data);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

app.get('/search/polygonHourly', (req, res) => {
    const tickerSymbol = req.query.ticker;
    // console.log(tickerSymbol)
    const apiKey = "UE_bvZYHUteYHEDvzPv4xB8xZH1t1jlD";

    // const currentDate = new Date();
    // const fromDate = new Date(currentDate);
    // fromDate.setDate(currentDate.getDate() - 1);
    // const from_date=fromDate.getFullYear()+"-"+(fromDate.getMonth()+1).toString().padStart(2,'0')+"-"+(fromDate.getDate().toString().padStart(2, '0'));
    // const to_date=currentDate.getFullYear()+"-"+(currentDate.getMonth()+1).toString().padStart(2,'0')+"-"+currentDate.getDate().toString().padStart(2,'0');
    // hello
    const currentDate = new Date();
    const offset = -7 * 60 * 60 * 1000;
    const currentDatePDT = new Date(currentDate.getTime() + offset);
    const fromDatePDT = new Date(currentDatePDT);
    fromDatePDT.setDate(currentDatePDT.getDate() - 1);
    const from_date = `${fromDatePDT.getFullYear()}-${(fromDatePDT.getMonth() + 1).toString().padStart(2, '0')}-${fromDatePDT.getDate().toString().padStart(2, '0')}`;
    const to_date = `${currentDatePDT.getFullYear()}-${(currentDatePDT.getMonth() + 1).toString().padStart(2, '0')}-${currentDatePDT.getDate().toString().padStart(2, '0')}`;


    
    
    console.log(from_date);
    console.log(to_date);
   
    axios.get(`https://api.polygon.io/v2/aggs/ticker/${tickerSymbol}/range/1/hour/${from_date}/${to_date}?adjusted=true&sort=asc&apiKey=${apiKey}`)
    // axios.get(`https://api.polygon.io/v2/aggs/ticker/${tickerSymbol}/range/1/hour/2024-03-23/2024-03-24?adjusted=true&sort=asc&apiKey=${apiKey}`)
        .then(response => {
            // console.log(response.data);
            res.json(response.data);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

app.get('/search/recTrends', (req, res) => {
    const tickerSymbol = req.query.ticker;
    // console.log(tickerSymbol)
    const apiKey = "cmt29n9r01qpvcptjrdgcmt29n9r01qpvcptjre0";
    
    axios.get(`https://finnhub.io/api/v1/stock/recommendation?symbol=${tickerSymbol}&token=${apiKey}`)
        .then(response => {
            // console.log(response.data);
            res.json(response.data);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

app.get('/search/companyEarnings', (req, res) => {
    const tickerSymbol = req.query.ticker;
    // console.log(tickerSymbol)
    const apiKey = "cmt29n9r01qpvcptjrdgcmt29n9r01qpvcptjre0";
    
    axios.get(`https://finnhub.io/api/v1/stock/earnings?symbol=${tickerSymbol}&token=${apiKey}`)
        .then(response => {
            // console.log(response.data);
            res.json(response.data);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

app.get('/search/polygonTwoYr', (req, res) => {
    const tickerSymbol = req.query.ticker;
    // console.log(tickerSymbol)
    const apiKey = "UE_bvZYHUteYHEDvzPv4xB8xZH1t1jlD";

    const currentDate = new Date();
    const fromDate = new Date(currentDate);
    fromDate.setFullYear(currentDate.getFullYear() - 2);
    const from_date=fromDate.getFullYear()+"-"+(fromDate.getMonth()+1).toString().padStart(2,'0')+"-"+(fromDate.getDate().toString().padStart(2, '0'));
    const to_date=currentDate.getFullYear()+"-"+(currentDate.getMonth()+1).toString().padStart(2,'0')+"-"+currentDate.getDate().toString().padStart(2,'0');
    // console.log(from_date);
    // console.log(to_date);

    axios.get(`https://api.polygon.io/v2/aggs/ticker/${tickerSymbol}/range/1/day/${from_date}/${to_date}?adjusted=true&sort=asc&apiKey=${apiKey}`)
        .then(response => {
            // console.log(response.data);
            res.json(response.data);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});


async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
    //   console.log("1");
      await client.connect();
    //   console.log("2");
      // Send a ping to confirm a successful connection
    //   await client.db("admin").command({ ping: 1 });
      await client.db("HW3").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
  
run().catch(console.dir);

app.get('/watchlist/getStock',async (req,res)=>{
    try{
        var database=client.db("HW3");
        // console.log("1");
        var collection=database.collection("favorites");
        // console.log("2");
        var data = await collection.find({}).toArray();
        console.log(data);

        res.json(data);
    }
    catch(error)
    {
        console.log("Error fetching data from MongoDB",error);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.post('/watchlist/addStock',async (req,res)=>{
    try{
        var database=client.db("HW3");
        // console.log("1");
        const data=req.body;
        // console.log("Data from frontend:",data);
        await database.collection("favorites").insertOne({
            ticker:data.ticker
        });
        console.log("Document inserted successfully");
        res.json("Added Successfully");
    }
    catch(error)
    {
        console.log("Error posting data to MongoDB",error);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.delete('/watchlist/deleteStock', async(req,res)=>{
    try{
        var database=client.db("HW3");
        database.collection("favorites").deleteOne({
            ticker:req.query.ticker
        });
        console.log(req.query.ticker," deleted")

        var collection=database.collection("favorites");
        var data = await collection.find({}).toArray();
        console.log(data);

        res.json(data);
    }
    catch(error){
        console.log("Error posting data to MongoDB",error);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.get('/portfolio/getBalance', async(req,res)=>{
    try{
        var database=client.db("HW3");
        var collection=database.collection("balance");
        // console.log("2");
        var data = await collection.find({}).toArray();
        console.log(data);
        res.json(data);
    }
    catch(error){
        console.log("Error getting balance from MongoDB",error);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.get('/portfolio/buyStock1',async (req,res)=>{
    try{
        var database=client.db("HW3");
        // console.log("1");
        const newBalance=req.query.ticker;
        console.log("Data from frontend:",newBalance);
        await database.collection("balance").updateOne(
            {},
            {$set:{balance:newBalance}}
            );
        console.log("Balance updated successfully");
        res.json("Balance updated Successfully");
    }
    catch(error)
    {
        console.log("Error posting data to MongoDB",error);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.post('/portfolio/buyStock2',async (req,res)=>{
    try{
        var database=client.db("HW3");
        
        const data=req.body;

        const existingStock = await database.collection("portfolio").findOne({ticker:data.ticker});
        if(existingStock)
        {
            await database.collection("portfolio").updateOne(
                {ticker:data.ticker},
                {$inc:{quantity:Number(data.quantity)}}
            );
            console.log("Quantity updated successfully");
            res.json(existingStock);
        }
        else{
            await database.collection("portfolio").insertOne({
                ticker:data.ticker,
                name:data.name,
                quantity:parseInt(data.quantity),
                price:data.price
            });
            console.log("Stock Buy and inserted successfully");
            res.json(existingStock);
        }
        
    }
    catch(error)
    {
        console.log("Error posting data to MongoDB",error);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.get('/portfolio/getPortfolio', async(req,res)=>{
    try{
        var database=client.db("HW3");
        var collection=database.collection("portfolio");
        var data = await collection.find({}).toArray();
        console.log(data);
        res.json(data);
    }
    catch(error){
        console.log("Error getting balance from MongoDB",error);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.post('/portfolio/isBought', async (req,res)=>{
    try{
        var database=client.db("HW3");
        
        const ticker=req.body.ticker;
        console.log("Data from frontend ",ticker);

        const existingStock = await database.collection("portfolio").findOne({ticker:ticker});
        console.log(existingStock);
        const exists = !!existingStock;
        if(exists)
        {
            res.json({ exists: exists, quantity:existingStock.quantity });
        }
        else
        {
            res.json({ exists: exists, quantity:null });
        }
        
        
    }
    catch(error)
    {
        console.log("Error posting data to MongoDB",error);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.post('/portfolio/sellStock', async (req, res) => {
    try {
        var database = client.db("HW3");

        const data = req.body;

        const existingStock = await database.collection("portfolio").findOne({ ticker: data.ticker });

        if (existingStock) {
            if (existingStock.quantity >= data.quantity) {
                await database.collection("portfolio").updateOne(
                    { ticker: data.ticker },
                    { $inc: { quantity: -Number(data.quantity) } }
                );
                console.log("Quantity updated successfully");
                // if(existingStock.quantity == 0)
                if(existingStock.quantity == data.quantity)
                {
                    await database.collection("portfolio").deleteOne({
                        ticker:data.ticker,
                        // name:data.name,
                        // quantity:0,
                        // price:data.price
                    });
                }
                res.json({ message: "Stock sold successfully" });
            }
            else {
                res.status(400).json({ error: "Not enough quantity to sell" });
            }
        } else {
            res.status(404).json({ error: "Stock not found in portfolio" });
        }

    } catch (error) {
        console.log("Error selling stock:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})



// for news:
app.get('/search/top_news', (req, res) => {

    const currentDate = new Date();
    const fromDate = new Date(currentDate);
    fromDate.setDate(currentDate.getDate() - 7);
    const from_date=fromDate.getFullYear()+"-"+(fromDate.getMonth()+1).toString().padStart(2,'0')+"-"+(fromDate.getDate().toString().padStart(2, '0'));
    const to_date=currentDate.getFullYear()+"-"+(currentDate.getMonth()+1).toString().padStart(2,'0')+"-"+currentDate.getDate().toString().padStart(2,'0');

    const tickerSymbol = req.query.ticker;
    // console.log(tickerSymbol)
    const apiKey = "cmt29n9r01qpvcptjrdgcmt29n9r01qpvcptjre0";
    // console.log(req)
    console.log("ohhh hellloooooooo")
    axios.get(`https://finnhub.io/api/v1/company-news?symbol=${tickerSymbol}&from=${from_date}&to=${to_date}&token=${apiKey}`)
        .then(response => {
            // console.log(response.data);
            res.json(response.data);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

const root=require("path").join(__dirname, "dist");
app.use(express.static(root));
// app.use("/", (req, res) => {
//     res.sendFile("index.html", { root });
//   });

app.use("/", (req, res, next) => {
    if(req.originalUrl==="/"){
        res.redirect(302,"/search/home");
    }
    else{
        next();
    }
});
app.use("/search/home", (req, res) => {
    res.sendFile("index.html", { root });
  });

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
