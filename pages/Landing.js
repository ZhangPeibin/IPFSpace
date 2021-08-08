import React from "react";
import {css} from "@emotion/react";
import * as Constants from "../common/constants";


const STYLES_CONTAINER = css`
  position: -webkit-sticky;
  position: sticky;
  max-width: 1440px;
  width: 100%;
  height: 100%;
  margin: 72px auto;
  display: block;
  padding: 32px 0px;
  padding-left: 48px;
  padding-right: 48px;
  font-family: ${Constants.font.text};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl0};
  display: block;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 12px 24px;
  }
`;

const STYLES_OFFERS = css`
  position: -webkit-sticky;
  position: sticky;
  max-width: 1440px;
  width: 100%;
  height: 100%;
  margin: 0px auto;
  display: block;
  padding: 32px 0px;
  padding-left: 48px;
  padding-right: 48px;
  font-family: ${Constants.font.text};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl0};
  display: block;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 12px 24px;
  }
`;

const diverDiv = css`
  width: 210px;
  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 6px;
  }
`;

const img = css`
  height: 340px;
  @media (max-width: ${Constants.sizes.mobile}px) {
    height: 180px;
  }
`;

const OFFERS_DIV = css`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow-wrap: break-word;
  width: 100%;
  margin-bottom: 6px;
  @media (max-width: ${Constants.sizes.mobile}px) {
  }
`;

const OFFERS_DIV_PARENT = css`
  position: relative;
  margin: 0px auto;
  display: flex;
  width: 100%;
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
  }
`;

const offer_text = css`
    font-size: 18px;
  font-family: "Calibri";
`;

export default function Landing() {
    return (
        <div>
            <main>
                <section >
                    <div css={STYLES_CONTAINER}>
                        <div>
                            <h3 style={{fontSize: "52px"}} className="mb-2 font-medium">
                                How IPFSpace store
                            </h3>
                            <p style={{fontSize: "20px", color: "#1C1D1E"}}
                               className="text-lg font-light leading-relaxed mt-4 mb-8">
                                All data are built on the next protocols that power the web3
                                (IPFS,Filecoin,Textile,NFT.storage,Web3.storage)
                            </p>
                        </div>

                        <div className="w-full  mr-auto ml-auto flex">
                            <div
                                className="relative  flex flex-col min-w-0 break-words  w-full mb-6 shadow-lg rounded-lg">
                                <img
                                    css={img}
                                    alt="..."
                                    src="/static/ipfs.png"
                                    className="w-full align-middle rounded-t-lg"
                                />
                                <blockquote className="relative p-8 mb-4">
                                    <h4 style={{fontSize:"22px"}} className=" font-bold text-gray-700">
                                        Hot Storage
                                    </h4>
                                    <p style={{fontSize:"18px"}} className=" font-light mt-2 text-gray-700">
                                        Data stored  hot layer is on the  IPFS network ,
                                        is designed to be fast and available on the IPFS network ,
                                        Data stored with hot enabled can pinned to Pinata and other IPFS nodes.
                                        We use nft.storage and web3.storage to provide users with stable and free IPFS storage space
                                    </p>
                                </blockquote>
                            </div>
                            <div css={diverDiv}/>
                            <div
                                className="relative flex flex-col min-w-0 break-words  w-full mb-6 shadow-lg rounded-lg">
                                <img
                                    css={img}
                                    alt="..."
                                    src="/static/filecoin.png"
                                    className="w-full align-middle rounded-t-lg"
                                />
                                <blockquote className="relative p-8 mb-4">
                                    <h4 style={{fontSize:"22px"}} className=" font-bold text-gray-700">
                                        Cold Storage
                                    </h4>
                                    <p style={{fontSize:"18px"}} className=" font-light mt-2 text-gray-700">
                                        The data stored in the Cold layer is stored on the Filecoin network by miners and is designed for secure and persistent storage on the Filecoin network.
                                        Cold storage will only be stored on the main network by miners according to the user's choice. Big data can be stored directly on Filecoin.
                                    </p>
                                </blockquote>
                            </div>
                        </div>

                    </div>
                </section>

                <section className="pb-20" style={{background:"#ebeff0"}}>
                    <div css={STYLES_OFFERS}>
                        <div>
                            <h3 style={{fontSize: "52px"}} className="mb-4 mt-4 font-medium">
                                What IPFSpace offers
                            </h3>
                        </div>

                        <div css={OFFERS_DIV_PARENT}>
                            <div
                                css={OFFERS_DIV}>
                                <h2 style={{fontSize: "32px"}} className="mb-2 mt-4 font-medium">
                                    Decentralized Registry
                                </h2>
                                <span css={offer_text}>
                                    The core of decentralized data sharing is the decentralized registration brought by the blockchain.
                                </span>
                                <span css={offer_text}>
                                    We will gradually access the web3 login specifications. With the help of decentralized identity authentication, users have their unique identifiers with metadata such as authors, data sharing agreements, data address chains, and user tags. At present, the identity information is stored in Textile's IPFS-based database, and the user authentication will be completely migrated to the web3 specification.
                                    On the other hand, content is stored on IPFS for tamper-proof and peer-to-peer distribution.
                                </span>
                                <br/>
                                <h2 style={{fontSize: "32px"}} className="mb-2 mt-4 font-medium">
                                    Decentralized Sharing
                                </h2>
                                <span css={offer_text}>
                                    Data sharing must pass the data sharing permission and be recorded in the decentralized identity data.
                                </span>
                                <span css={offer_text}>
                                    The data uploaded by users will be reviewed by other users. When enough users reach a consensus to deny the quality of the data, the weight of the data will be reduced or even lost. Cancellation of entry into the shared chain, the review conducted by the user will be recorded on the shared chain and a certain token reward will be obtained through consensus. After the data has passed the consensus, the provider will be rewarded. Any downloading, sharing, or liking of the data will also reward the provider. Data can be set as a price and purchased with rewarded tokens. Every behavior of the data will be recorded in the ledger.
                                    The additional rewards of the content provider will be gained by familiarizing the weight of the elements of the data.
                                </span>
                                <span  css={offer_text}>
                                     Of course, data NFT and on-chain transactions are also an important part of our sharing system.
                                </span>
                            </div>

                            <div css={diverDiv}/>

                            <div
                                css={OFFERS_DIV}>
                                <h2 style={{fontSize: "32px"}} className="mb-2 mt-4 font-medium">
                                    Decentralized storage
                                </h2>
                                <span css={offer_text}>
                                   Another core of decentralized data sharing is decentralized storage.
                                </span>
                                <span css={offer_text}>
                                    We use IPFS, a new storage protocol that will replace Http in the future. On the basis of IPFS-based content addressing, data sharing platforms will no longer have duplicate data. Due to decentralized data management, pirated data will also be banned by the original version. Using Filecoin, you can safely store important data in the human world for a long time. As a hot storage IPFS layer, it will provide data retrieval, insertion and other functions faster and more convenient.
                                    On the other hand, all data stored on IPFS will be recorded in decentralized user authentication.
                                </span>
                                <br/>
                                <h2 style={{fontSize: "32px"}} className="mb-2 mt-4 font-medium">
                                    Decentralized Searching
                                </h2>
                                <span  css={offer_text}>
                                   The shared data's metadata can be edited by the data provider and recorded in the decentralized identity verification.
                                </span>
                                <span  css={offer_text}>
                                    The shared data uses metadata to increase the search weight. The search weight can increase the probability of being searched (the more detailed the metadata, the easier it is to be searched accurately). At the same time, inappropriate metadata can be returned and recorded by the user. Records will be displayed in search results, which reduces inappropriate metadata. Shared data can be accessed by search engines via ShareAPI,
                                    and the meta-attributes of all data will also be entered into the IPFS search engine to increase search weight.By the way ,data that is not shared will not be searched.
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="pb-20" >
                    <div css={STYLES_OFFERS}>
                        <div>
                            <h3 style={{fontSize: "52px"}} className="mb-4 mt-4 font-medium">
                                What IPFSpace Next
                            </h3>
                        </div>

                        <div css={OFFERS_DIV_PARENT}>
                            <div
                                css={OFFERS_DIV}>
                                <h2 style={{fontSize: "30px"}} className="mb-2 mt-4 font-medium">
                                    1. Milestones for decentralized registration 's  development
                                </h2>
                                <h2 style={{fontSize: "30px"}} className="mb-2 mt-4 font-medium">
                                    2. Milestones for more complete optimization of data storage interaction
                                </h2>
                                <h2 style={{fontSize: "30px"}} className="mb-2 mt-4 font-medium">
                                    3. Milestones for Decentralized Sharing
                                </h2>
                                <h2 style={{fontSize: "30px"}} className="mb-2 mt-4 font-medium">
                                    4. Milestones for Decentralized Searching
                                </h2>
                            </div>
                        </div>


                        <div>
                            <h3 style={{fontSize: "52px",marginTop:"8rem"}} className="mb-4 font-medium">
                                How contact us
                            </h3>
                        </div>
                        <div css={OFFERS_DIV_PARENT}>
                            <div
                                css={OFFERS_DIV}>
                                <h2 style={{fontSize: "30px",fontFamily:"Calibri"}} className="mb-2 mt-4">
                                    WeChat: SimpleDoIt
                                </h2>
                                <h2 style={{fontSize: "30px",fontFamily:"Calibri"}} className="mb-2 mt-4">
                                    Slack: IPFSpace
                                </h2>
                                <h2 style={{fontSize: "30px",fontFamily:"Calibri"}} className="mb-2 mt-4">
                                    Telegram:  @peibin
                                </h2>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
