const https = require('https');

var tags = "kanzaki_ranko+shimamura_uzuki"

const options = {
    hostname: 'safebooru.org',
    port: 443,
    path: `/index.php?page=dapi&s=post&q=index&json=1&tags=${tags}`,
    method: 'GET',
};

const req = https.request(options, res => {
    let data = [];
    res.on('data', chunk => {
        data.push(chunk);
    });

    res.on('end', () => {
        console.log('Response ended: ');
        const posts = JSON.parse(Buffer.concat(data).toString());

        const returned = posts.length;
        console.log(returned);

        const ran = Math.floor(Math.random() * (returned - 1) + 1);
        const post = posts[`${ran}`];

        console.log(`safebooru.org//images/${post.directory}/${post.image}?${post.id}`);
    });
});

req.on('error', error => {
    console.error(error);
});

req.end();