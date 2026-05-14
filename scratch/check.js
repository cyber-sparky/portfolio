const https = require('https');

https.get('https://cybersparky.in', (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    const regex = /_next\/static\/chunks\/[^\"]+\.js/g;
    const matches = data.match(regex) || [];
    let found = false;
    let pending = matches.length;
    
    if (pending === 0) {
      console.log('No JS chunks found.');
      return;
    }

    matches.forEach(m => {
      https.get('https://cybersparky.in/' + m, (r) => {
        let js = '';
        r.on('data', d => js += d);
        r.on('end', () => {
          if (js.includes('cybersparky-analytics')) {
            console.log('FOUND VERCEL URL IN:', m);
            found = true;
          } else if (js.includes('localhost:3001')) {
            console.log('FOUND LOCALHOST IN:', m);
            found = true;
          }
          pending--;
          if (pending === 0 && !found) console.log('NEITHER FOUND IN BUNDLE');
        });
      });
    });
  });
});
