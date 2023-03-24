const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here

let obj = {};
function isValid(req, res, next) {
    
    const n1 = Number(req.body.num1); 
    const n2 = Number(req.body.num2); 
   
    if(n1 < -1000000 || n2 < -1000000) obj.resMsg = "Underflow";
    if(n1 > 1000000 || n2 > 1000000) obj.resMsg = "Overflow";
    if(isNaN(n1) || isNaN(n2)) obj.resMsg = "Invalid data types";
    if(n2 == 0 && req.url == "/divide") obj.resMsg = "Cannot divide by zero";
    
    if(obj.resMsg) {
        obj.resStatus = "error";
        obj.resValue = null;
    }
    else {
        obj.resStatus = "success";
        function isFlow(val) {
            let res = null;
            if(val < -1000000) res = "Underflow";
            if(val > 1000000) res = "Overflow";
            return res;
        }
        let flow;
        switch(req.url) {
            case "/add" :
                obj.resValue = n1 + n2;
                flow = isFlow(obj.resValue);
                if(flow) {
                    obj.resStatus = "error";
                    obj.resMsg = flow;
                    obj.resValue = null;
                }else {
                    obj.resMsg = "the sum of given two numbers"
                }
                break;

            case "/sub" :
                obj.resValue = n1 - n2;
                flow = isFlow(obj.resValue);
                if(flow) {
                    obj.resStatus = "error";
                    obj.resMsg = flow;
                    obj.resValue = null;
                }else {
                    obj.resMsg = "the difference of given two numbers"
                }
                break;

            case "/multiply" :
                obj.resValue = n1 * n2;
                flow = isFlow(obj.resValue);
                if(flow) {
                    obj.resStatus = "error";
                    obj.resMsg = flow;
                    obj.resValue = null;
                }else {
                    obj.resMsg = "the product of given two numbers"
                }
                break;

            case "/divide" :
                obj.resValue = n1 / n2;
                flow = isFlow(obj.resValue);
                if(flow) {
                    obj.resStatus = "error";
                    obj.resMsg = flow;
                    obj.resValue = null;
                }else {
                    obj.resMsg = "the division of given two numbers"
                }
                break;
        }

    }
    // console.log(obj)
    next();

}

function isResponse() {
    const str = `Response:
    status: ${obj.resStatus}
    message: ${obj.resMsg} 
    result: ${obj.resValue}`;

    obj = {};
    return str;
}

app.get('/', function (req, res) {
    res.send("Hello world!")
});

app.post("/add", isValid, (req, res) => {
    res.send(isResponse());
});

app.post("/sub", isValid, (req, res) => {
    res.send(isResponse());
})

app.post("/multiply", isValid, (req, res) => {
    res.send(isResponse());
})

app.post("/divide", isValid, (req, res) => {
    res.send(isResponse());
})



app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;