<template>
    <div>
        <div></div>
        <div>
            <p>{{data}}</p>
        </div>
    </div>
</template>

<script>

    const http = require('http');

    export default {
      props: [],
      data() {
        return {
          server: null,
          data: null,
        };
      },
      mounted() {
        this.createHttpServer();
      },
      computed: {
        defaultComputed() {
          return '';
        },
      },
      methods: {
        createHttpServer() {
          this.server = http.createServer((req, res) => {
            const route = req.url;
            console.log(route);
            if (route === '/csgo' && req.method === 'POST') {
              this.collectRequestData(req);
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(route);
            res.end();
          }).listen(8080);
        },
        collectRequestData(request) {
          let body = '';
          request.on('data', (chunk) => {
            body += chunk;
          });
          request.on('end', () => {
            if (!body) {
              return;
            }
            const postDataObject = JSON.parse(body);
            this.data = postDataObject;
          });
        },
      },
    };
</script>

<style>
</style>
