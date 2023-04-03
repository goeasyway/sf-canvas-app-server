const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const decode  = require('salesforce-signed-request');

const app = express();

const CANVAS_CONSUMER_SECRET = process.env.CANVAS_CONSUMER_SECRET || '1586353B033F2964A83ADA151F926FEB9E5722BEF9872EA445D87F23566EDED5';

app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.render('index');
});

app.post('/', function (req, res) {
    let signedRequest = decode(req.body.signed_request, CANVAS_CONSUMER_SECRET),
        context = signedRequest.context,
        oauthToken = signedRequest.client?.oauthToken,
        instanceUrl = signedRequest.client?.instanceUrl;
    res.render('sf_page', { instanceUrl: instanceUrl, context: JSON.stringify(context) });
})

app.listen(process.env.PORT || 3000, function () {
    console.log("server is listening!!!");
});