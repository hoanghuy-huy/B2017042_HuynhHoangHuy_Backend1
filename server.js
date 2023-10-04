const app = require("./app")
const config = require("./app/config")
const MongoDB = require("./app/utils/mongodb.util")


const  bodyParser = require('body-parser')


// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const  urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser)
app.use(jsonParser)


async function startServer(){
    try {
        await MongoDB.connect(config.db.uri)
        console.log("Connect to the database !!!")
        
        // start server 
        const port = config.app.port;
        app.listen(port,() => {
            console.log(`Server is running on port ${port}.` )
        })
    } catch (error) {
        console.log("Cannot connect to the database", error)
        process.exit()
    }
}

startServer()