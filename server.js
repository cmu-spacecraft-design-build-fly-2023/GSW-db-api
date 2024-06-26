import express from 'express';
import { get_table } from './lib/api.js';
import { host_ip } from './lib/secrets.js';


const app = express();
const hostname = host_ip;
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.get('/heartbeat/:table', (req, res) => {
    const start_time = req.query.start_time || "-1h";
    const stop_time = req.query.stop_time || "now()";
    get_table(req.params.table, start_time, stop_time, (err, data) => {
        if (err) {
            console.log(err)
            res.status(404).send("not found")
        } else {
            res.status(200).send(JSON.stringify(data))
        }
    })
})

app.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`);
});