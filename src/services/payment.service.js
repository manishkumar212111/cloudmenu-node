const https = require('https');
const querystring = require('querystring');

const request = async (dta) => {
	const path='/v1/checkouts';
	const data = querystring.stringify({
		'entityId':'8a8294174b7ecb28014b9699220015ca',
		'amount':dta.totalAmount,
		'currency':'EUR',
		'paymentType':'DB',
		"merchantMemo" : {test: "Manish"},
		'billing.country': "SA",
		// 'card.country': "SA"
	});
	const options = {
		port: 443,
		host: 'eu-test.oppwa.com',
		path: path,
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': data.length,
			'Authorization':'Bearer OGE4Mjk0MTc0YjdlY2IyODAxNGI5Njk5MjIwMDE1Y2N8c3k2S0pzVDg='
		}
	};
	return new Promise((resolve, reject) => {
		const postRequest = https.request(options, function(res) {
			const buf = [];
			res.on('data', chunk => {
				buf.push(Buffer.from(chunk));
			});
			res.on('end', () => {
				const jsonString = Buffer.concat(buf).toString('utf8');
				try {
					resolve(JSON.parse(jsonString));
				} catch (error) {
					reject(error);
				}
			});
		});
		postRequest.on('error', reject);
		postRequest.write(data);
		postRequest.end();
	});
};


const checkPayment = async (id) => {
	var path=`/v1/checkouts/${id}/payment`;
	path += '?entityId=8a8294174b7ecb28014b9699220015ca';
	const options = {
		port: 443,
		host: 'eu-test.oppwa.com',
		path: path,
		method: 'GET',
		headers: {
			'Authorization':'Bearer OGE4Mjk0MTc0YjdlY2IyODAxNGI5Njk5MjIwMDE1Y2N8c3k2S0pzVDg='
		}
	};
	return new Promise((resolve, reject) => {
		const postRequest = https.request(options, function(res) {
			const buf = [];
			res.on('data', chunk => {
				buf.push(Buffer.from(chunk));
			});
			res.on('end', () => {
				const jsonString = Buffer.concat(buf).toString('utf8');
				try {
					resolve(JSON.parse(jsonString));
				} catch (error) {
					reject(error);
				}
			});
		});
		postRequest.on('error', reject);
		postRequest.end();
	});
};
const createPayment = (data , cb) => {
    request(data).then( res => cb(res)).catch(console.error);
}

const verifyPayment = (id, cb) => {
    checkPayment(id).then( res => cb(res)).catch(console.error);
}
module.exports= {
    createPayment,
	verifyPayment
}