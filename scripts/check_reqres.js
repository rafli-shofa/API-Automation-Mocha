const fetch = require('node-fetch');

async function check() {
  try {
    const get = await fetch('https://reqres.in/api/users?page=2');
    const getText = await get.text();
    console.log('GET STATUS:', get.status);
    console.log('GET CONTENT-TYPE:', get.headers.get('content-type'));
    console.log('GET BODY START:\n', getText.slice(0, 800));
  } catch (e) {
    console.error('GET ERROR:', e && e.message ? e.message : e);
  }

  try {
    const post = await fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'eve.holt@reqres.in', password: 'cityslicka' })
    });
    const postText = await post.text();
    console.log('\nPOST STATUS:', post.status);
    console.log('POST CONTENT-TYPE:', post.headers.get('content-type'));
    console.log('POST BODY START:\n', postText.slice(0, 800));
  } catch (e) {
    console.error('POST ERROR:', e && e.message ? e.message : e);
  }
}

check();
