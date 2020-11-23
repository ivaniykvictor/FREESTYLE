const http = require('http');
const url = require('url');
const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');


const { PORT, accessToken, chatId } = process.env;


const requestListener = async (req, res) => {
    res.writeHead(200);
  
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '.css') {
      fs.readFile(__dirname + '/css/main.css', (err, text) => {
        if (err) {
          console.error(err);
          return res.end(JSON.stringify({ ok: false, description: err.message }));
        }
        // res.writeHead(200, { 'Content-Type': 'text/javascript' });
        // res.end(content, 'utf-8');
        // res.end();
        res.write(text);
        res.end();
      }); 
      
    };
  
    if (parsedUrl.pathname === '/') {
      fs.readFile(__dirname + '/index.html', 'utf8', (err, text) => {
        if (err) {
          console.error(err);
          return res.end(JSON.stringify({ ok: false, description: err.message }));
        }
        res.write(text);
        res.end();
      });
      
    } else if (parsedUrl.pathname === '/send') {
      const { text } = parsedUrl.query;
  
      let tgRes;
      try {
        tgRes = await fetch(`https://api.telegram.org/bot${accessToken}/sendMessage?chat_id=${chatId}&text=${text}`);
        tgRes = await tgRes.json();
        if (tgRes && tgRes.ok) {
          return res.end(JSON.stringify({ ok: true }));
        }
        throw new Error('No response from telegram');
      } catch (err) {
        console.error(err);
        return res.end(JSON.stringify({ ok: false, description: err.message }));
      }
    } else {
      res.end();
    }
  };

// function requestStyle (reg, res) {
  

//   let myPath = url.parse(reg.url).pathname;
    
//         switch(myPath){
    
//           case '/FREESTYLE':
    
//             // get the extensions of the files inside this dir (.html, .js, .css)
//             var extname = myPath.extname(path);
    
//               switch (extname) {
    
//                 //get the html
//                 case '.html':
//                   fs.readFile(__dirname + 'FREESTYLE/index.html', function (err, data) {
//                     if (err) return send404(res);
//                     res.writeHead(200, {'Content-Type': 'text/html'});
//                     res.write(data, 'utf8');
//                     res.end();
//                   });
//                 break;
//                  //get the script that /public/chatclient.html references
//             case '.js':
//               fs.readFile(__dirname + '/FREESTYLE/js/main.js', function (err, data) {
//                 if (err) return send404(res);
//                 res.writeHead(200, { 'Content-Type': 'text/javascript' });
//                 res.end(content, 'utf-8');
//                 res.end();
//               });
//             break;

//             // get the styles that /public/chatclient.html references
//             case '.css':
//               fs.readFile(__dirname + '/FREESTYLE/css/main.css', function (err, data) {
//                 if (err) return send404(res);
//                 res.writeHead(200, { 'Content-Type': 'text/javascript' });
//                 res.end(content, 'utf-8');
//                 res.end();
//               });
//           }
//           break;

//           default: send404(res);
//         }
// }
  
  const server = http.createServer(requestListener);
  
  console.log('server starting...');
  server.listen(PORT, err => {
    if(err) console.error(err);
    else console.log('server is up');
  });

// var http = require('http')
// , url = require('url')
// , fs = require('fs')
// , path = require('path')
// , server;



//   const server = http.createServer(function(req,res){

//       var myPath = url.parse(req.url).pathname;
    
//         switch(myPath){
    
//           case '/FREESTYLE':
    
//             // get the extensions of the files inside this dir (.html, .js, .css)
//             var extname = mypath.extname(path);
    
//               switch (extname) {
    
//                 //get the html
//                 case '.html':
//                   fs.readFile(__dirname + '/FREESTYLE/index.html', function (err, data) {
//                     if (err) return send404(res);
//                     res.writeHead(200, {'Content-Type': 'text/html'});
//                     res.write(data, 'utf8');
//                     res.end();
//                   });
//                 break;
//                  //get the script that /public/chatclient.html references
//             case '.js':
//               fs.readFile(__dirname + '/FREESTYLE/js/main.js', function (err, data) {
//                 if (err) return send404(res);
//                 res.writeHead(200, { 'Content-Type': 'text/javascript' });
//                 res.end(content, 'utf-8');
//                 res.end();
//               });
//             break;

//             // get the styles that /public/chatclient.html references
//             case '.css':
//               fs.readFile(__dirname + '/FREESTYLE/css/main.css', function (err, data) {
//                 if (err) return send404(res);
//                 res.writeHead(200, { 'Content-Type': 'text/javascript' });
//                 res.end(content, 'utf-8');
//                 res.end();
//               });
//           }
//           break;

//           default: send404(res);
//         }
//     });


// if (parsedUrl.pathname === '.css') {
//   fs.readFile(__dirname + '/css/main.css', (err, text) => {
//     if (err) {
//       console.error(err);
//       return res.end(JSON.stringify({ ok: false, description: err.message }));
//     }
//     // res.writeHead(200, { 'Content-Type': 'text/javascript' });
//     // res.end(content, 'utf-8');
//     // res.end();
//     res.write(text);
//     res.end();
//   }); 
  
// };

// if (parsedUrl.pathname === '/') {
//   fs.readFile(__dirname + '/index.html', 'utf8', (err, text) => {
//     if (err) {
//       console.error(err);
//       return res.end(JSON.stringify({ ok: false, description: err.message }));
//     }
//     res.write(text);
//     res.end();
//   });
  
// } else if (parsedUrl.pathname === '/send') {
//   const { text } = parsedUrl.query;

//   let tgRes;
//   try {
//     tgRes = await fetch(`https://api.telegram.org/bot${accessToken}/sendMessage?chat_id=${chatId}&text=${text}`);
//     tgRes = await tgRes.json();
//     if (tgRes && tgRes.ok) {
//       return res.end(JSON.stringify({ ok: true }));
//     }
//     throw new Error('No response from telegram');
//   } catch (err) {
//     console.error(err);
//     return res.end(JSON.stringify({ ok: false, description: err.message }));
//   }
// } else {
//   res.end();
// }