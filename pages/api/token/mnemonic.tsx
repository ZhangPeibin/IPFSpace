import * as S from "@common/server";
import * as U from "@common/utilities";
import * as M from "@common/mnemonicUtils"

export default async function mnemonicGenerate(req, res) {
  await S.cors(req, res);

  let mnemonic;
  try {
    mnemonic = await M.generateMnemonic();
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "The server failed to generated a token." });
  }

  if (U.isEmpty(mnemonic)) {
    res.status(500).json({ error: "The server did not return a token." });
  }

  res.json({ mnemonic });
}
