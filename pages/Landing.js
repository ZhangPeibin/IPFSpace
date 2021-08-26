import React from "react";
import {css} from "@emotion/react";
import * as Constants from "../common/constants";


const STYLES_CONTAINER = css`
  position: -webkit-sticky;
  position: sticky;
  max-width: 1440px;
  width: 100%;
  height: 100%;
  margin: 0px auto;
  padding-top: 72px;
  display: block;
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
  width: 427px;
  height: 240px;
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

const NEXT = css`
  position: relative;
  display: flex;
  flex-direction: row;
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

const NEXT_PARENT = css`
  position: relative;
  margin: 0px auto;
  display: block;
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
                <section className="pb-24" style={{background: "#faebd7"}}>
                    <div css={STYLES_CONTAINER}>
                        <div>
                            <h3 style={{
                                fontSize: "52px",
                                fontFamily:"sans-serif"
                            }} className="mb-2 font-medium">
                                How DDshare store
                            </h3>
                            <p style={{
                                fontSize: "20px",
                                color: "#1C1D1E",
                                fontWeight:500,
                                fontFamily:"sans-serif"}}
                               className="text-lg font-light leading-relaxed mt-4 mb-8">
                                All data are built on the next protocols that power the web3
                                (IPFS,Filecoin,Textile,NFT.storage,Web3.storage)
                            </p>
                        </div>

                        <div style={{
                            display: "flex",
                            alignItems:"center",
                            justifyContent:"center",
                        }}>
                            <div
                                style={{
                                    width: "427px",
                                    marginRight:"24px",
                                }}>
                                <img
                                    css={img}
                                    alt="..."
                                    src="/static/ipfs.png"
                                    className=" align-middle rounded-t-lg"
                                />

                                <blockquote className=" p-4 mb-4">
                                    <a href={"https://ipfs.io/"} target={"_blank"}  style={{fontSize: "22px"}} className=" font-bold text-gray-700">
                                        IPFS
                                    </a>
                                </blockquote>
                            </div>
                            <div
                                style={{
                                    marginLeft:"24px",
                                    width: "427px",
                                }}>
                                <img
                                    css={img}
                                    alt="..."
                                    src="/static/filecoin.png"
                                    className="  rounded-t-lg"
                                />
                                <blockquote className=" p-4 mb-4">
                                    <a href={"https://filecoin.io/"} target={"_blank"} style={{fontSize: "22px"}} className=" font-bold text-gray-700">
                                        FileCoin
                                    </a>
                                </blockquote>
                            </div>
                        </div>


                        <div style={{
                            display: "flex",
                            alignItems:"center",
                            justifyContent:"center",
                        }}>
                            <div
                                style={{
                                    width: "427px",
                                    marginRight:"24px",
                                }}>
                                <img
                                    css={img}
                                    alt="..."
                                    src="/static/nft-storage.png"
                                    className=" align-middle rounded-t-lg"
                                />

                                <blockquote className=" p-4 mb-4">
                                    <a href={"https://nft.storage/"} target={"_blank"} style={{fontSize: "22px"}} className=" font-bold text-gray-700">
                                        NFT.Storage
                                    </a>
                                </blockquote>
                            </div>
                            <div
                                style={{
                                    marginLeft:"12px",
                                    marginRight:"12px",
                                    width: "427px",
                                }}>
                                <img
                                    css={img}
                                    alt="..."
                                    src="/static/web3-storage-card.png"
                                    className="  rounded-t-lg"
                                />
                                <blockquote className=" p-4 mb-4">
                                    <a href={"https://web3.storage/"} target={"_blank"} style={{fontSize: "22px"}} className=" font-bold text-gray-700">
                                        Web3.storage
                                    </a>
                                </blockquote>
                            </div>

                            <div
                                style={{
                                    marginLeft:"24px",
                                    width: "427px",
                                }}>
                                <img
                                    css={img}
                                    alt="..."
                                    src="/static/textile.png"
                                    className="  rounded-t-lg"
                                />
                                <blockquote className=" p-4 mb-4">
                                    <a href={"https://www.textile.io"} target={"_blank"} style={{fontSize: "22px"}} className=" font-bold text-gray-700">
                                        Textile.io
                                    </a>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="pb-24" style={{background: "#ffffff"}}>
                    <div css={STYLES_OFFERS}>
                        <div>
                            <h3 style={{fontSize: "52px"}} className="mb-4 mt-8 font-medium">
                                What DDshare offers
                            </h3>
                        </div>


                        <div css={OFFERS_DIV_PARENT}>
                            <div css={OFFERS_DIV}>
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
                            </div>
                            <div style={{width: "32px"}}></div>
                            <div css={OFFERS_DIV}>
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
                            </div>
                        </div>

                        <div css={OFFERS_DIV_PARENT}>
                            <div css={OFFERS_DIV}>
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
                                <span css={offer_text}>
                                     Of course, data NFT and on-chain transactions are also an important part of our sharing system.
                                </span>
                            </div>
                            <div style={{width: "32px"}}></div>

                            <div css={OFFERS_DIV}>
                                <h2 style={{fontSize: "32px"}} className="mb-2 mt-4 font-medium">
                                    Decentralized Searching
                                </h2>
                                <span css={offer_text}>
                                   The shared data's metadata can be edited by the data provider and recorded in the decentralized identity verification.
                                </span>
                                <span css={offer_text}>
                                    The shared data uses metadata to increase the search weight. The search weight can increase the probability of being searched (the more detailed the metadata, the easier it is to be searched accurately). At the same time, inappropriate metadata can be returned and recorded by the user. Records will be displayed in search results, which reduces inappropriate metadata. Shared data can be accessed by search engines via ShareAPI,
                                    and the meta-attributes of all data will also be entered into the IPFS search engine to increase search weight.By the way ,data that is not shared will not be searched.
                                </span>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="pb-20">
                    <div css={STYLES_OFFERS}>
                        <div>
                            <h3 style={{fontSize: "52px"}} className="mb-4 mt-4 font-medium">
                                What DDshare Next
                            </h3>
                        </div>

                        <div css={NEXT_PARENT}>
                            <div
                                css={NEXT}>
                                <div css={OFFERS_DIV} style={{marginRight: "32px"}}>
                                    <h2 style={{fontSize: "32px"}} className="mb-2 mt-4 font-medium">
                                        Decentralized Registry
                                    </h2>
                                    <img src="/static/idx.png" style={{width: "100%",}}/>
                                </div>


                                <div css={OFFERS_DIV} style={{marginLeft: "32px"}}>
                                    <h2 style={{fontSize: "32px"}} className="mb-2 mt-4 font-medium">
                                        Decentralized Storage
                                    </h2>
                                    <img src="/static/img.png"/>
                                </div>
                            </div>

                            <div
                                css={NEXT}>
                                <div css={OFFERS_DIV} style={{marginRight: "32px"}}>
                                    <h2 style={{fontSize: "32px"}} className="mb-2 mt-4 font-medium">
                                        Decentralized Sharing
                                    </h2>
                                    <img src="/static/img_1.png"/>
                                </div>
                                <div css={OFFERS_DIV} style={{marginLeft: "32px"}}>
                                    <h2 style={{fontSize: "32px"}} className="mb-2 mt-4 font-medium">
                                        Decentralized Search
                                    </h2>
                                    <img src="/static/img_2.png"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
