import * as S from "@common/server";
import * as M from "@common/mnemonicUtils";
import * as U from "@common/utilities";

export default async function generateIdentityByMnemonic(req, res) {
    await S.cors(req, res);
    const mnemonic = req.body.mnemonic;
    let identity;
    try {
        identity = await M.generateIdentityByMnemonic(mnemonic);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "The server failed to generated a token." });
    }

    if (U.isEmpty(identity)) {
        res.status(500).json({ error: "The server did not return a identity." });
    }
    res.json({ identity});
}
