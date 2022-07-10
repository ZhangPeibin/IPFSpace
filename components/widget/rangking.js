import React, {Component} from 'react';
import {css} from "@emotion/react";
import * as Constants from "../../common/constants";
import Web3Modal from "web3modal";
import Web3 from "web3";
import web3 from "web3";
import * as DDNFTMarket from "../../abi/DDNFTMarketplace";
import {nftmarketaddress} from "../../config";

const STYLES_CONTAINER = css`
  padding-top: 72px;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  background-color: ${Constants.system.white};
  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-top: 24px;
    padding-left: 12px;
  }

  overflow-y: scroll;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;

  ::-webkit-scrollbar {
    width: 0px;
    display: none;
  }

  ::-webkit-scrollbar-track {
    background: ${Constants.system.foreground};
  }

  ::-webkit-scrollbar-thumb {
    background: ${Constants.system.darkGray};
  }
`;

const customStyles = {
    option: (base, state) => ({
        ...base,
        background: "#fff",
        color: "#727272",
        borderRadius: state.isFocused ? "0" : 0,
        "&:hover": {
            background: "#ddd",
        }
    }),
    menu: base => ({
        ...base,
        background: "#fff !important",
        borderRadius: 0,
        marginTop: 0
    }),
    menuList: base => ({
        ...base,
        padding: 0
    }),
    control: (base, state) => ({
        ...base,
        padding: 2
    })
};


const options = [
    {value: 'Last 7 days', label: 'Last 7 days'},
    {value: 'Last 24 hours', label: 'Last 24 hours'},
    {value: 'Last 30 days', label: 'Last 30 days'},
    {value: 'All time', label: 'All time'}
]
const options1 = [
    {value: 'All categories', label: 'All categories'},
    {value: 'Art', label: 'Art'},
    {value: 'Music', label: 'Music'},
    {value: 'Domain Names', label: 'Domain Names'},
    {value: 'Virtual World', label: 'Virtual World'},
    {value: 'Trading Cards', label: 'Trading Cards'},
    {value: 'Collectibles', label: 'Collectibles'},
    {value: 'Sports', label: 'Sports'},
    {value: 'Utility', label: 'Utility'}
]

class Ranking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            items: [],
        };
        this.loadData = this.loadData.bind(this);
    }

    async componentDidMount() {
        const web3Modal = new Web3Modal();
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();

        this.setState({
            web3: web3,
            accounts: accounts,

        })

        await this.loadData();
    }

    getGeneralAttributes =  (nft) =>{
        return parseInt(nft.likeNum) + parseInt(nft.viewCount) + parseInt(nft.downloadCount);
    }

    loadData = async () => {
        const contract = new this.state.web3.eth.Contract(DDNFTMarket.ABI, nftmarketaddress);
        let marketItems = await contract.methods.fetchMarketItems().call({from: this.state.accounts[0]}, function (error, result) {
        });
        console.log("all")
        console.log(marketItems)

        let sharePoolItems = await contract.methods.fetchSharePoolItems().call({from: this.state.accounts[0]}, function (error, result) {
        });
        console.log("sharing")
        console.log(sharePoolItems)
        var allItems = marketItems.concat(sharePoolItems);
        allItems.sort(function(a,b){ // 这是比较函数
            const a_total = parseInt(a.likeNum) + parseInt(a.viewCount) + parseInt(a.downloadCount);
            const b_total = parseInt(b.likeNum) + parseInt(b.viewCount) + parseInt(b.downloadCount);
            return b_total - a_total;    // 降序
        })

        this.setState({
            items: allItems
        })
        console.log("all")
        console.log(allItems)

    }




    render() {
        return (
            <div css={STYLES_CONTAINER}>
                <section className='container'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            {/*<div className="items_filter centerEl">*/}
                            {/*    <div className='dropdownSelect one'><Select className='select1' styles={customStyles}*/}
                            {/*                                                menuContainerStyle={{'zIndex': 999}}*/}
                            {/*                                                defaultValue={options[0]} options={options}/></div>*/}
                            {/*    <div className='dropdownSelect two'><Select className='select1' styles={customStyles}*/}
                            {/*                                                defaultValue={options1[0]} options={options1}/>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            <table className="table de-table table-rank">
                                <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">desc</th>
                                    <th scope="col">price</th>
                                    <th scope="col">Owners</th>
                                    <th scope="col">General attributes</th>
                                </tr>
                                <tr></tr>
                                </thead>
                                <tbody>
                                {this.state.items.map((nft, index) => (
                                    <tr key={index}>
                                        <td scope="row">
                                            {nft.title}
                                        </td>
                                        <td>{nft.description}</td>
                                        <td>{web3.utils.fromWei(nft.price)+" "}<span>matic</span></td>
                                        <td>{nft.owner}</td>
                                        <td>{this.getGeneralAttributes(nft)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            <div className="spacer-double"></div>

                            {/*<ul className="pagination justify-content-center">*/}
                            {/*    <li className="active"><span>1 - 20</span></li>*/}
                            {/*    <li><span>21 - 40</span></li>*/}
                            {/*    <li><span>41 - 60</span></li>*/}
                            {/*</ul>*/}

                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Ranking;