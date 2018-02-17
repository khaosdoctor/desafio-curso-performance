const http = require('http')

http.createServer((req, res) => {
  res.end('Hello you')
}).listen(3000, () => console.log('Server listening on port 3000'))
