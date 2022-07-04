import React from 'react';
import Select from 'react-select'
import {css} from "@emotion/react";
import * as Constants from "../../common/constants";

const STYLES_CONTAINER = css`
  padding-top:72px;
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


const Ranking = () => (
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
                            <th scope="col">Collection</th>
                            <th scope="col">Volume</th>
                            <th scope="col">24h %</th>
                            <th scope="col">7d %</th>
                            <th scope="col">Floor Price</th>
                            <th scope="col">Owners</th>
                            <th scope="col">Assets</th>
                        </tr>
                        <tr></tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td scope="row">
                                Abstraction
                            </td>
                            <td>15,225.87</td>
                            <td className="d-plus">+87.54%</td>
                            <td className="d-plus">+309.49%</td>
                            <td>5.9</td>
                            <td>2.8k</td>
                            <td>58.5k</td>
                        </tr>
                        <tr>
                            <td scope="row">
                                Sketchify
                            </td>
                            <td>14,304.78</td>
                            <td className="d-plus">+35.11%</td>
                            <td className="d-plus">+239.83%</td>
                            <td>2.9</td>
                            <td>2.3k</td>
                            <td>28.4k</td>
                        </tr>
                        <tr>
                            <td scope="row">
                                Cartoonism
                            </td>
                            <td>13,705.58</td>
                            <td className="d-min">-33.56%</td>
                            <td className="d-plus">+307.97%</td>
                            <td>4.5</td>
                            <td>2.2k</td>
                            <td>48.8k</td>
                        </tr>
                        <tr>
                            <td scope="row">
                                Papercut
                            </td>
                            <td>12,516.75</td>
                            <td className="d-plus">+23.45%</td>
                            <td className="d-plus">+171.25%</td>
                            <td>6.3</td>
                            <td>5.3k</td>
                            <td>54.2k</td>
                        </tr>
                        </tbody>
                    </table>

                    <div className="spacer-double"></div>

                    <ul className="pagination justify-content-center">
                        <li className="active"><span>1 - 20</span></li>
                        <li><span>21 - 40</span></li>
                        <li><span>41 - 60</span></li>
                    </ul>

                </div>
            </div>
        </section>
    </div>

);
export default Ranking;