import * as os from 'os';
import * as ip from 'ip';
import * as tencentcloud from 'tencentcloud-sdk-nodejs-dnspod';

const { Client } = tencentcloud.dnspod.v20210323;

const config = require('./ddnspod.config.js');

const client = new Client({
	credential: {
		secretId: config.secretId,
		secretKey: config.secretKey,
	},
	profile: {
		httpProfile: {
			endpoint: 'dnspod.tencentcloudapi.com',
		},
	},
});

function findMyIp(): string {
	const networks = os.networkInterfaces();
	const configs = networks[config.networkInterface];
	if (!configs) {
		throw new Error('The network interface does not exist.');
	}

	const ipv6 = configs.filter((config) => !config.internal && config.family === 'IPv6' && ip.isPublic(config.address));
	return ipv6[0].address;
}

(async function main(): Promise<void> {
	console.log(`Domain: ${config.domain}`);
	console.log(`Subdomain: ${config.subdomain}`);

	const myIp = findMyIp();
	console.log(`IP: ${myIp}`);

	const { RecordList: records } = await client.DescribeRecordList({
		Domain: config.domain,
		Subdomain: config.subdomain,
	});
	if (!records || records.length < 1) {
		throw new Error('Failed to find corresponding records. Please manually create it first.');
	}

	const [record] = records;
	if (record.Type === 'AAAA' && record.Value === myIp) {
		console.log('Already updated.');
		return;
	}

	await client.ModifyRecord({
		Domain: config.domain,
		SubDomain: config.subdomain,
		RecordType: 'AAAA',
		RecordId: record.RecordId,
		RecordLine: record.Line,
		Value: myIp,
	});
}());
