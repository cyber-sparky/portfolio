const https = require('https');

https.get('https://cybersparky.in/_next/static/chunks/08tom6hf48yje.js', (res) => {
  let js = '';
  res.on('data', d => js += d);
  res.on('end', () => {
    const regex = /\"https:\/\/cybersparky-analytics[^\"]*\"/g;
    const matches = js.match(regex);
    console.log(matches);
  });
});
