var http = require('http');

let rejected;
process.on("unhandledRejection", function(reason, promise) {
    console.log(reason.stack); // "boom"
    console.log(rejected === promise); // true
    promise.catch(err => console.log(err));
});


http.createServer(function(req, res) {
  rejected = Promise.reject(new Error("boom")).catch((err) => {
    console.error(err);
  }); // 出现reject, 没有catch处理
  res.write('hello world!');
  res.end();
}).listen(8000, function() {
  console.log('listening 8000');
});