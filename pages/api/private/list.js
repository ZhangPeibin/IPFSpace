import * as A from "../../../common/UserInfo";

export default async function (req, res) {
    if(req.method === 'GET'){
        const query = req.query; // json kv
        const identity = query['identity']
        const threadId = query['threadId']

        const client = await A.auth(identity);
        const value = await A.getDBData(identity, client,threadId);

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(value)) //
    }
}
