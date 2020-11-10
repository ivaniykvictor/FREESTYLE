const http = require('http');
const url = require('url');
const fs = require('fs');
const fetch = require('node-fetch');

const { PORT, accessToken, chatId } = process.env;

const requestListener = async (req, res) => {
    res.writeHead(200);
  
    const parsedUrl = url.parse(req.url, true);
  
    if (parsedUrl.pathname === '/') {
      fs.readFile(__dirname + '/index.html', __dirname + '/main.css', 'utf8', (err, text) => {
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
  
  const server = http.createServer(requestListener);
  
  console.log('server starting...');
  server.listen(PORT, err => {
    if(err) console.error(err);
    else console.log('server is up');
  });