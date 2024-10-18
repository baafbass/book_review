const http = require('http')

const PORT = 5000


const server = http.createServer()


server.listen(PORT,()=>{
	console.log(`Server running at http://localhost:${PORT}`);
})