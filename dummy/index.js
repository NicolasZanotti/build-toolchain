require('marko/node-require').install();

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const log = require('fancy-log');
const template = require('./index.marko');

const port = process.argv[2] || 3000;
const mimeType = {'.html': 'text/html','.js': 'text/javascript', '.css': 'text/css'};

/*
	This is a simple HTTP server that does server-side rendering of a Marko template and hosts static assets.
*/
http
	.createServer((req, res) => {
		if (req.url === '/') {
			return template.render({}, res);
		}

		const parsedUrl = url.parse(req.url);
		const pathname = `.${parsedUrl.pathname}`;

		fs.exists(pathname, exist => {
			if(!exist) {
				res.statusCode = 404;
				return res.end();
			}

			fs.readFile(pathname, (error, data) => {
				if(error){
					res.statusCode = 500;
					return res.end();
				}

				const ext = path.parse(pathname).ext;
				res.setHeader('Content-type', mimeType[ext] || 'text/html' );
				return res.end(data);
			});
		});
	})
	.listen(
		port,
		error => log.info(error ? error: `Server available at: http://localhost:${port}`)
	);
