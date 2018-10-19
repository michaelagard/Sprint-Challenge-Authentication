const { server } = require('./server.js');
const projectPullRequest = 'https://github.com/LambdaSchool/Sprint-Challenge-Authentication/pull/390';
const serverPort = '7100';
const serverName = 'Sprint-Challenge-Authentication';
const port = process.env.PORT || serverPort;

server.get('/', (req, res) => { // sanity check root endpoint
  res.send(`${serverName} running on port ${serverPort}<br>More information: <a href="${projectPullRequest}">GitHub Repo</a>`);
});

server.listen(port, () => {
  console.log(`\n=== Server listening on port ${port}\n`);
});
