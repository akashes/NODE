const http = require('http')
const fs= require('fs')
const path = require('path')
const url = require('url')
const PORT = 8000;

const server=http.createServer((req,res)=>{
    const q=url.parse(req.url,true) // second argument to get query values as an object 
    console.log(q.query)
    // console.log(q.pathname)
    // console.log(req.url)
    if(req.url=='/' || req.url=='/index.html'){
        const filePath = path.join(__dirname,'sample.html')
        console.log(filePath)
        fs.readFile(filePath,'utf8',(err,data)=>{
            if(err){
                res.writeHead(500,{'Content-Type':'text/plain'})
                res.end('err')
            }else{
                res.writeHead(200,{'Content-Type':'text/html'})
                res.end(data)
            }
        }) 

    }else if(req.url=='/signup'){
        const filePath = path.join(__dirname,'signup.html')
        fs.readFile(filePath,'utf8',(err,data)=>{
            if(err){
                res.writeHead(500,{'Content-Type':'text/plain'})
                res.end('error')
            }else{
                res.writeHead(500,{'Content-Type':'text/html'})
                res.end(data)
            }
        })
    }else if(q.pathname==='/signupaction'){
        console.log(q.query)
        const{uname,email,password}=q.query
        console.log(uname,email,password)
        res.write('<h1>'+uname+'</h1>')
        res.end()

    }
    

}).listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

/////////////////////////////
  <form action="/signupaction" method="GET">
        <input id="username" name="uname" type="text" placeholder="username">
        <input id="email" name="email" type="text" placeholder="email">
        <input id="password" name="password" type="password" placeholder="password">
        <button type="submit">submit</button>
    </form>
