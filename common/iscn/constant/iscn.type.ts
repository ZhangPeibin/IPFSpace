import { ISCNRecord } from "@likecoin/iscn-js";

export interface ISCNRegisterPayload {
  name: string;
  description: string;
  tagsString: string;
  url: string;
  license: string;
  ipfsHash: string;
  fileSHA256: string;
  type: string;
  authorNames: string[];
  authorUrls: string[][];
  authorWallets: any[][];
  cosmosWallet: string;
  likerIds: string[];
  descriptions: string[];
}

export interface Author {
  name: string;
  url: string[];
  wallet: string[];
  likerId: string;
  authorDescription: string;
}

export function transferAuth(authors) {
  return authors.map((a) => a.url.map((b: any) => b.content))
}


export interface ISCNRecordWithID extends ISCNRecord {
  id: string;
}
