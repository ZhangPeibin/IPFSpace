import * as S from "@common/server";
import * as A from "@common/UserInfo";
import * as U from "@common/utilities";

export default async function auth(req, res) {
    await S.cors(req, res);
    const identity = req.body.identity;
    let dbClient;
    try {
        dbClient = await A.auth(identity);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "The server failed to generated a token." });
    }

    if (U.isEmpty(identity)) {
        res.status(500).json({ error: "The server did not return a identity." });
    }
    res.json({ identity});
}
