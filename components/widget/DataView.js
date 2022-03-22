import * as React from "react";
import * as Constants from "../../common/constants";
import * as Strings from "../../common/strings";
import * as SVG from "../../common/svg";
import * as Window from "../../common/window";

import {Link} from "./Link";
import {css} from "@emotion/react";
import {Boundary} from "./Boundary";
import {CheckBox} from "./CheckBox";
import {Table} from "./Table";
import {FileTypeIcon} from "../core/FileTypeIcon";
import {GroupSelectable, Selectable} from "../core/selectable/";
import {ButtonPrimary, ButtonWarning} from "./Buttons";
import FilePreviewBubble from "./FilePreviewBubble";
import SlateMediaObjectPreview from "./SlateMediaObjectPreview";
import fileDownload from "js-file-download";
import {ConfirmationModal} from "./ConfirmationModal";
import {PopoverNavigation} from "./PopoverNavigation";
import {getURLfromCID} from "../../common/strings";
import {deFile, pinata} from "../../common/fileupload";
import {withSnackbar} from "notistack";
import {saveAs} from "../../common/window";
import {KeplrConfirmationModal} from "./KeplrConfirmationModal";
import {initKeplr} from "../../common/iscn/keplr";
import {searchISCNById} from "../../common/iscn/sign";
const axios = require('axios');

const STYLES_CONTAINER_HOVER = css`
  display: flex;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_ICON_BOX = css`
  height: 32px;
  width: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 16px;
`;

const STYLES_CANCEL_BOX = css`
  height: 16px;
  width: 16px;
  background-color: ${Constants.system.brand};
  border-radius: 3px;
  position: relative;
  right: 3px;
  cursor: pointer;
  box-shadow: 0 0 0 1px ${Constants.system.brand};
`;


const STYLES_LINK = css`
  display: inline;
  cursor: pointer;
  transition: 200ms ease all;
  font-size: 0.9rem;
  padding: 12px 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 320px;
  @media (max-width: ${Constants.sizes.tablet}px) {
    max-width: 120px;
  }
`;

const STYLES_VALUE = css`
  font-size: 0.9rem;
  padding: 12px 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const STYLES_ICON_BOX_HOVER = css`
  display: inline-flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;

  :hover {
    color: ${Constants.system.redlight3};
  }
`;

const STYLES_ICON_BOX_BACKGROUND = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 25px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 3px;
  position: absolute;
  bottom: 8px;
  right: 8px;
`;

const STYLES_ACTION_BAR = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  padding: 0px 32px;
  box-sizing: border-box;
  background-color: ${Constants.system.textGrayDark};
  width: 90vw;
  max-width: 878px;
  height: 48px;
  @media (max-width: ${Constants.sizes.mobile}px) {
    //display: none;
  }
`;

const STYLES_ACTION_BAR_CONTAINER = css`
  position: fixed;
  bottom: 12px;
  left: 0px;
  width: 100vw;
  display: flex;
  justify-content: center;
  z-index: ${Constants.zindex.header};
  @media (max-width: ${Constants.sizes.mobile}px) {
  }
`;

const STYLES_RIGHT = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

const STYLES_LEFT = css`
  width: 100%;
  min-width: 10%;
  display: flex;
  align-items: center;

`;

const STYLES_FILES_SELECTED = css`
  font-family: ${Constants.font.semiBold};
  color: ${Constants.system.white};
  @media (max-width: ${Constants.sizes.mobile}px) {
  }
`;

const STYLES_COPY_INPUT = css`
  pointer-events: none;
  position: absolute;
  opacity: 0;
`;

const STYLES_IMAGE_GRID = css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  width: 100%;
  @media (max-width: ${Constants.sizes.mobile}px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const STYLES_IMAGE_BOX = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 12px auto;
  }

  :hover {
    box-shadow: 0px 0px 0px 1px ${Constants.system.lightBorder} inset,
    0 0 40px 0 ${Constants.system.shadow};
  }
`;

const STYLES_MOBILE_HIDDEN = css`
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_TAGS_WRAPPER = css`
  box-sizing: border-box;
  display: block;
  width: 100%;
  max-width: 800px;
`;

const STYLES_LIST = css`
  display: inline-flex;
  margin: 0;
  padding: 0;
`;

const STYLES_TAG = css`
  list-style-type: none;
  border-radius: 4px;
  background: ${Constants.system.bgGray};
  color: ${Constants.system.newBlack};
  font-family: ${Constants.font.text};
  padding: 2px 8px;
  margin: 8px 8px 0 0;

  span {
    line-height: 1.5;
    font-size: 14px;
  }

  &:hover {
    background: ${Constants.system.gray30};
  }
`;

class Tags extends React.Component {
    state = {
        isTruncated: false,
        truncateIndex: 0,
    };

    listWrapper = React.createRef();
    listEl = React.createRef();

    componentDidMount() {
        this._handleTruncate();
    }

    _handleTruncate = () => {
        const listWrapper = this.listWrapper.current?.getBoundingClientRect();
        const tagNodes = this.listEl.current?.querySelectorAll("li");
        const tagElems = Array.from(tagNodes);

        let total = 0;
        const truncateIndex = tagElems.findIndex((tagElem) => {
            const {width} = tagElem?.getBoundingClientRect();
            total += width;

            if (total >= listWrapper.width - 50) {
                return true;
            }
        });

        if (truncateIndex > 0) {
            this.setState({isTruncated: true, truncateIndex});
            return;
        }

        this.setState({isTruncated: false, truncateIndex: tagElems.length});
    };

    render() {
        const {tags} = this.props;

        return (
            <div css={STYLES_TAGS_WRAPPER}>
                <div ref={this.listWrapper} style={{width: 340}}>
                    <ul css={STYLES_LIST} ref={this.listEl}>
                        {(this.state.isTruncated ? tags.slice(0, this.state.truncateIndex) : tags).map(
                            (tag) => (
                                <li key={tag} css={STYLES_TAG}>
                                    <span>{tag}</span>
                                </li>
                            )
                        )}
                    </ul>
                    {this.state.isTruncated && <span>...</span>}
                </div>
            </div>
        );
    }
}

class DataView extends React.Component {
    _mounted = false;

    state = {
        menu: null,
        checked: {},
        viewLimit: 40,
        scrollDebounce: false,
        imageSize: 100,
        modalShow: false,
        keplrShow:false,
    };

    isShiftDown = false;
    lastSelectedItemIndex = null;

    gridWrapperEl = React.createRef();

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        this.calculateWidth();
        this.debounceInstance = Window.debounce(this.calculateWidth, 200);
        if (!this._mounted) {
            this._mounted = true;
            window.addEventListener("scroll", this._handleCheckScroll);
            window.addEventListener("resize", this.debounceInstance);
            window.addEventListener("keydown", this._handleKeyDown);
            window.addEventListener("keyup", this._handleKeyUp);

            if (this.gridWrapperEl.current) {
                this.gridWrapperEl.current.addEventListener("selectstart", this._handleSelectStart);
            }
        }
    }

    componentWillUnmount() {
        this._mounted = false;
        window.removeEventListener("scroll", this._handleCheckScroll);
        window.removeEventListener("resize", this.debounceInstance);
        window.removeEventListener("keydown", this._handleKeyDown);
        window.removeEventListener("keyup", this._handleKeyUp);

        if (this.gridWrapperEl.current) {
            this.gridWrapperEl.current.removeEventListener("selectstart", this._handleSelectStart);
        }
    }

    calculateWidth = () => {
        let windowWidth = window.innerWidth;
        let imageSize;
        if (windowWidth < Constants.sizes.mobile) {
            imageSize = (windowWidth - 2 * 24 - 20) / 2;
        } else {
            imageSize = (windowWidth - 2 * 56 - 4 * 20) / 5;
        }
        this.setState({imageSize});
    };

    _handleScroll = (e) => {
        const windowHeight =
            "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight - 600) {
            this.setState({viewLimit: this.state.viewLimit + 30});
        }
    };

    _handleCheckScroll = Window.debounce(this._handleScroll, 200);

    /* NOTE(daniel): This disable text selection while pressing shift key */
    _handleSelectStart = (e) => {
        if (this.isShiftDown) {
            e.preventDefault();
        }
    };

    _addSelectedItemsOnDrag = (e) => {
        let selectedItems = {};
        for (const i of e) {
            selectedItems[i] = true;
        }
        this.setState({checked: {...this.state.checked, ...selectedItems}});
    };

    _removeSelectedItemsOnDrag = (e) => {
        const selectedItems = {...this.state.checked};
        for (const i in selectedItems) {
            selectedItems[i] = selectedItems[i] && !e.includes(+i);
            if (!selectedItems[i]) delete selectedItems[i];
        }
        this.setState({checked: selectedItems, ...selectedItems});
    };

    _handleDragAndSelect = (e, {isAltDown}) => {
        if (isAltDown) {
            this._removeSelectedItemsOnDrag(e);
            return;
        }
        this._addSelectedItemsOnDrag(e);
    };

    _handleKeyUp = (e) => {
        if (e.keyCode === 16 && this.isShiftDown) {
            this.isShiftDown = false;
        }
    };

    _handleKeyDown = (e) => {
        if (e.keyCode === 16 && !this.isShiftDown) {
            this.isShiftDown = true;
        }

        let numChecked = Object.keys(this.state.checked).length || 0;
        if (e.keyCode === 27 && numChecked) {
            this._handleUncheckAll();
        }
    };

    _handleCheckBox = (e, i) => {
        e.stopPropagation();
        e.preventDefault();

        let checked = this.state.checked;
        if (this.isShiftDown && this.lastSelectedItemIndex !== i) {
            return this._handleShiftClick({
                currentSelectedItemIndex: i,
                lastSelectedItemIndex: this.lastSelectedItemIndex,
                checked,
            });
        }

        if (checked[i]) {
            delete checked[i];
        } else {
            checked[i] = true;
        }
        this.setState({checked});
        this.lastSelectedItemIndex = i;
    };

    _handleShiftClick = ({currentSelectedItemIndex, lastSelectedItemIndex, checked}) => {
        const start = Math.min(currentSelectedItemIndex, lastSelectedItemIndex);
        const stop = Math.max(currentSelectedItemIndex, lastSelectedItemIndex) + 1;

        let rangeSelected = {};

        for (let i = start; i < stop; i++) {
            if (checked[currentSelectedItemIndex]) {
                delete checked[i];
            } else {
                rangeSelected[i] = true;
            }
        }

        let newSelection = Object.assign({}, checked, rangeSelected);
        this.setState({checked: newSelection});
        this.lastSelectedItemIndex = currentSelectedItemIndex;

    };

    _handleDownloadFiles = async () => {
        const selectedFiles = this.props.items.filter((_, i) => this.state.checked[i]);
        for (const v of selectedFiles) {
            await this._fileDownload(v)
        }
        this.setState({checked: {}});
    };

    _fileDownload = async (v)=>{
        if(v){
            if(v.encrypt){
                this.props.encryptLoading(true);
                deFile(Strings.getURLfromCID(v.cid),v.filename,()=>{
                    this.props.encryptLoading(false);
                })
            }else{
                saveAs(Strings.getURLfromCID(v.cid),v.filename)
            }
        }
    }

    _handleDelete = (res, id) => {
        if (!res) {
            this.setState({modalShow: false});
            return;
        }
        let ids;
        const cidToDelete = this.state.cidToDelete;
        if (cidToDelete) {
            ids = [cidToDelete]
            this.setState({
                cidToDelete: null
            })
        } else {
            ids = Object.keys(this.state.checked).map((id) => {
                let index = parseInt(id);
                let item = this.props.items[index];
                return item.cid;
            });
        }

        this.props.deleteCid(ids)
        this.setState({checked: {}, modalShow: false});
    };

    _handleCheckBoxMouseEnter = (i) => {
        this.setState({hover: i});

    };

    _handleCheckBoxMouseLeave = (i) => {
        this.setState({hover: null});
    };

    _handleCopy = (e, value) => {
        e.stopPropagation();
        this._handleHide();
        this.setState({copyValue: value}, () => {
            this._ref.select();
            document.execCommand("copy");
        });
    };

    _handleCopyISCNId = (e, cid,file) => {
        e.stopPropagation();
        this._handleHide();

        const iscnId =file['iscnId']
        if(iscnId){
            this.setState({copyValue: iscnId[0]}, () => {
                this._ref.select();
                document.execCommand("copy");
            });
        }else{
            this.showErrorMessage("This data has not been registered with ISCN")
        }
    };

    showErrorMessage = (message)=>{
        this.props.enqueueSnackbar(message,
            {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
            })
    }

    _handleViewISCN = async (e, cid, file) => {
        e.stopPropagation();
        this._handleHide();
        const iscnId = file['iscnId']
        if (iscnId) {
            const url = "https://app.like.co/view/"+encodeURIComponent(iscnId)
            window.open(url)
        } else {
            this.showErrorMessage("This data has not been registered with ISCN")
        }
    };

    _handleSharingPool = async (e,each) =>{
        e.stopPropagation();
        this._handleHide();
        const itemId = each['itemId']
        if (itemId) {
            this.props.createSharePoolItem(itemId)
        } else {
            this.showErrorMessage("You cannot mint data that is not registered with an ISCN")
        }
    }

    _handleSell = async (e,each) =>{
        e.stopPropagation();
        this._handleHide();
        const itemId = each['itemId']
        if (itemId) {
            this.props.sellNFT(itemId)
        } else {
            this.showErrorMessage("You cannot mint data that is not registered with an ISCN")
        }
    }

    _handleMint = async (e,cid,file) =>{
        e.stopPropagation();
        this._handleHide();
        const iscnId = file['iscnId']
        if (iscnId) {
            this.props.mint(file)
        } else {
            this.showErrorMessage("You cannot mint data that is not registered with an ISCN")
        }
    }

    _handleDeleteByMenu = (e, cid) => {
        this._handleHide(e)

        this.setState({cidToDelete: cid, modalShow: true});
    }

    _handleRegisterISCN = (e, cid,filename) =>{
        this._handleHide(e)
        if(this.props.keplr && this.props.keplrAddress){
            this.props._openISCN(cid,filename)
        }else{
            this.setState({iscnCid: cid,iscnfilename:filename, keplrShow: true})
        }
    }

    _handleEnableKeplrWalletAndRegisterISCN = async (isEnable) => {
        this.setState({keplrShow: false});

        if (!isEnable) {
            return;
        }
        this.props._openISCN(this.state.iscnCid,this.state.iscnfilename)
    }

    _handlePinata = async (e, cid, name) => {
        this._handleHide(e)
        const props = this.props;
        await pinata(name, cid, function (response) {
            if (response) {
                if(response.status===200){
                    props.enqueueSnackbar("pin file success ",
                        {
                            variant: 'success',
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'center',
                            },
                        })
                }else{
                    props.enqueueSnackbar(response.statusText,
                        {
                            variant: 'error',
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'center',
                            },
                        })

                }
            }
        })
    }

    _handleHide = (e) => {
        this.setState({menu: null});
    };


    _handleUncheckAll = () => {
        this.setState({checked: {}});
        this.lastSelectedItemIndex = null;
    };

    /** Note(Amine): These methods will stop collision between
     Drag to desktop event and drop to upload
     */
    _stopPropagation = (e) => e.stopPropagation();

    _disableDragAndDropUploadEvent = () => {
        document.addEventListener("dragenter", this._stopPropagation);
        document.addEventListener("drop", this._stopPropagation);
    };

    _enableDragAndDropUploadEvent = () => {
        document.removeEventListener("dragenter", this._stopPropagation);
        document.removeEventListener("drop", this._stopPropagation);
    };

    _handleDragToDesktop = (e, object) => {
        const url = Strings.getURLfromCID(object.cid);
        const title = object.filename;
        const type = object.type;
        e.dataTransfer.setData("DownloadURL", `${type}:${title}:${url}`);
    };

    getCommonTagFromSelectedItems = () => {
        const {items} = this.props;
        const {checked} = this.state;

        if (!Object.keys(checked).length) {
            return;
        }

        let allTagsFromSelectedItems = Object.keys(checked).map((index) =>
            items[index].data.tags ? items[index].data.tags : []
        );

        let sortedItems = allTagsFromSelectedItems.sort((a, b) => a.length - b.length);
        if (sortedItems.length === 0) {
            return [];
        }

        let commonTags = sortedItems.shift().reduce((acc, cur) => {
            if (acc.indexOf(cur) === -1 && sortedItems.every((item) => item.indexOf(cur) !== -1)) {
                acc.push(cur);
            }

            return acc;
        }, []);

        return commonTags;
    };

    render() {
        var mq = window.matchMedia("(max-width: 768px)");

        let numChecked = Object.keys(this.state.checked).length || 0;
        const footer = (
            <React.Fragment>
                {numChecked ? (
                    <div css={STYLES_ACTION_BAR_CONTAINER}>
                        <div css={STYLES_ACTION_BAR}>
                            <div css={STYLES_LEFT}>
                <span css={STYLES_FILES_SELECTED}>
                  {numChecked} file{numChecked > 1 ? "s" : ""} selected
                </span>
                            </div>
                            <div css={STYLES_RIGHT}>
                                <ButtonWarning
                                    transparent
                                    style={{marginLeft: 8, color: Constants.system.white}}
                                    onClick={() => this._handleDownloadFiles()}
                                >
                                    Download
                                </ButtonWarning>
                                <ButtonWarning
                                    transparent
                                    style={{marginLeft: 8, color: Constants.system.white}}
                                    onClick={() => this.setState({modalShow: true})}
                                >
                                    Delete
                                </ButtonWarning>
                                <div
                                    css={STYLES_ICON_BOX}
                                    onClick={() => {
                                        this.setState({checked: {}});
                                        this.lastSelectedItemIndex = null;
                                    }}
                                >
                                    <SVG.Dismiss height="20px" style={{color: Constants.system.darkGray}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </React.Fragment>
        );
        if (this.props.view === "grid") {
            return (
                <React.Fragment>
                    <GroupSelectable onSelection={this._handleDragAndSelect}>
                        <div css={STYLES_IMAGE_GRID} ref={this.gridWrapperEl}>
                            {this.props.items.slice(0, this.state.viewLimit).map((each, i) => {
                                return (
                                    <div
                                        key={each.cid}
                                        onClick={(event => {
                                            window.open(getURLfromCID(each.cid))
                                        })}
                                    >
                                        <Selectable
                                            key={each.cid}
                                            draggable={!numChecked}
                                            // onDragStart={(e) => {
                                            //   this._disableDragAndDropUploadEvent();
                                            //   this._handleDragToDesktop(e, each);
                                            // }}
                                            // onDragEnd={this._enableDragAndDropUploadEvent}
                                            selectableKey={i}
                                            css={STYLES_IMAGE_BOX}
                                            style={{
                                                width: this.state.imageSize,
                                                height: this.state.imageSize,
                                                boxShadow: numChecked
                                                    ? `0px 0px 0px 1px ${Constants.system.lightBorder} inset,
      0 0 40px 0 ${Constants.system.shadow}`
                                                    : "",
                                            }}
                                            onMouseEnter={() => this._handleCheckBoxMouseEnter(i)}
                                            onMouseLeave={() => this._handleCheckBoxMouseLeave(i)}
                                        >
                                            <SlateMediaObjectPreview file={each}/>
                                            <span css={STYLES_MOBILE_HIDDEN} style={{pointerEvents: "auto"}}>
                        {numChecked || this.state.hover === i || this.state.menu === each.cid ? (
                            <React.Fragment>
                                <div onClick={(e) => this._handleCheckBox(e, i)}>
                                    <CheckBox
                                        name={i}
                                        value={!!this.state.checked[i]}
                                        boxStyle={{
                                            height: 24,
                                            width: 24,
                                            backgroundColor: this.state.checked[i]
                                                ? Constants.system.brand
                                                : "rgba(255, 255, 255, 0.75)",
                                        }}
                                        style={{
                                            position: "absolute",
                                            bottom: 8,
                                            left: 8,
                                        }}
                                    />
                                </div>
                            </React.Fragment>
                        ) : null}
                      </span>
                                        </Selectable>
                                    </div>
                                );
                            })}
                            {[0, 1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    css={STYLES_IMAGE_BOX}
                                    style={{boxShadow: "none", cursor: "default"}}
                                />
                            ))}
                        </div>
                    </GroupSelectable>
                    {footer}
                    {this.state.modalShow && (
                        <ConfirmationModal
                            type={"DELETE"}
                            withValidation={false}
                            callback={this._handleDelete}
                            header={`Are you sure you want to delete the selected files?`}
                            subHeader={`These files will be deleted from all connected collections and your file library. You can’t undo this action.`}
                        />
                    )}
                    <input
                        ref={(c) => {
                            this._ref = c;
                        }}
                        readOnly
                        value={this.state.copyValue}
                        css={STYLES_COPY_INPUT}
                    />
                </React.Fragment>
            );
        }

        let columns;
        if (mq.matches) {
            columns = [
                {
                    key: "checkbox",
                    name: numChecked ? (
                        <div
                            css={STYLES_CANCEL_BOX}
                            onClick={() => {
                                this.setState({checked: {}});
                                this.lastSelectedItemIndex = null;
                            }}
                        >
                            <SVG.Minus height="16px" style={{color: Constants.system.white}}/>
                        </div>
                    ) : (
                        <span/>
                    ),
                    width: "24px",
                },
                {
                    key: "name",
                    name: <div style={{fontSize: "0.9rem", padding: "18px 0"}}>Name</div>,
                    width: "100%",
                },
                {
                    key: "more",
                    name: <span/>,
                    width: "48px",
                },
            ]
        } else {
            columns = [
                {
                    key: "checkbox",
                    name: numChecked ? (
                        <div
                            css={STYLES_CANCEL_BOX}
                            onClick={() => {
                                this.setState({checked: {}});
                                this.lastSelectedItemIndex = null;
                            }}
                        >
                            <SVG.Minus height="16px" style={{color: Constants.system.white}}/>
                        </div>
                    ) : (
                        <span/>
                    ),
                    width: "24px",
                },
                {
                    key: "name",
                    name: <div style={{fontSize: "0.9rem", padding: "18px 0"}}>Name</div>,
                    width: "100%",
                },
                {
                    key: "time",
                    name: <div style={{fontSize: "0.9rem", padding: "18px 0"}}>Create Time</div>,
                    width: "404px",
                },
                // {
                //   key: "tags",
                //   name: <div style={{ fontSize: "0.9rem", padding: "18px 0" }}>Tags</div>,
                //   width: "360px",
                // },
                {
                    key: "size",
                    name: <div style={{fontSize: "0.9rem", padding: "18px 0"}}>Size</div>,
                    width: "104px",
                },
                {
                    key: "more",
                    name: <span/>,
                    width: "48px",
                },
            ]
        }

        const rows = this.props.items.slice(0, this.state.viewLimit).map((each, index) => {
            const cid = each.cid;
            let actions = [
                {
                    text: "Copy CID",
                    onClick: (e) => this._handleCopy(e, cid),
                },
                {
                    text: "Delete",
                    onClick: (e) => this._handleDeleteByMenu(e, cid),
                },
                {
                    text: "Pin To Pinata",
                    onClick: (e) => this._handlePinata(e, cid, each.filename),
                },
            ]

            if(each.iscnId){
                actions.push({
                        text: "Copy ISCN ID",
                        onClick: (e) => this._handleCopyISCNId(e, cid, each),
                    },
                    {
                        text: "View ISCN",
                        onClick: (e) => this._handleViewISCN(e, cid, each),
                    })
            }else{
                actions.push(
                    {
                        text: "Register ISCN",
                        onClick: (e) => this._handleRegisterISCN(e, cid, each.filename),
                    },
                )
            }

            if(!each.isMint){
                actions.push({
                    text: "Mint NFT",
                    onClick: (e) => this._handleMint(e, cid, each),
                })
            }else{
                actions.push({
                    text: "Sell NFT",
                    onClick: (e) => this._handleSell(e, each),
                })

                actions.push({
                    text: "Add to SharingPool",
                    onClick: (e) => this._handleSharingPool(e, each),
                })
            }
            return {
                ...each,
                checkbox: (
                    <div onClick={(e) => this._handleCheckBox(e, index)}>
                        <CheckBox
                            name={index}
                            value={!!this.state.checked[index]}
                            boxStyle={{height: 16, width: 16}}
                            style={{
                                position: "relative",
                                right: 3,
                                margin: "12px 0",
                                opacity: numChecked > 0 || this.state.hover === index ? "100%" : "0%",
                            }}
                        />
                    </div>
                ),
                name: (
                    <Selectable
                        key={each.cid}
                        selectableKey={index}
                        draggable={!numChecked}
                        onDragStart={(e) => {
                            this._disableDragAndDropUploadEvent();
                            this._handleDragToDesktop(e, each);
                        }}
                        onDragEnd={this._enableDragAndDropUploadEvent}
                    >
                        <FilePreviewBubble cid={cid} type={each.type}>
                            <Link
                                redirect
                                // params={{ ...this.props.page.params, cid: each.cid }}}
                            >
                                <div css={STYLES_CONTAINER_HOVER} onClick={(e) => {
                                    window.open(getURLfromCID(cid))
                                }}>
                                    <div css={STYLES_ICON_BOX_HOVER} style={{paddingLeft: 0, paddingRight: 18}}>
                                        <FileTypeIcon encrypt={each.encrypt} type={each.type} height="24px"/>
                                    </div>
                                    <div css={STYLES_LINK}>{each.filename}</div>

                                    {
                                        each['iscnId'] && <img
                                            onClick={(e) => this._handleViewISCN(e, cid, each)}
                                            style={{width:"36px",marginLeft:"4px"}}
                                            alt="..."
                                            src="/static/iscn.png"
                                            className="  rounded-t-lg"
                                        />
                                    }

                                </div>
                            </Link>
                        </FilePreviewBubble>
                    </Selectable>
                ),
                // tags: <>{each.data.tags?.length && <Tags tags={each.data.tags} />}</>,
                time: <div css={STYLES_VALUE}>{each.createTime}</div>,
                size: <div css={STYLES_VALUE}>{Strings.bytesToSize(each.size)}</div>,
                more: true ? (
                    <div
                        css={STYLES_ICON_BOX_HOVER}
                        onClick={() =>
                            this.setState({
                                menu: this.state.menu === each.cid ? null : each.cid,
                            })
                        }
                    >
                        <SVG.MoreHorizontal height="24px"/>
                        {this.state.menu === each.cid ? (
                            <Boundary key={cid + Boundary}
                                      captureResize={true}
                                      captureScroll={false}
                                      enabled
                                      onOutsideRectEvent={this._handleHide}
                            >
                                <PopoverNavigation
                                    key={cid}
                                    style={{
                                        top: "48px",
                                        right: "40px",
                                    }}
                                    navigation={[
                                        actions
                                    ]}
                                />
                            </Boundary>
                        ) : null}
                    </div>
                ) : null,
            };
        });

        const data = {
            columns,
            rows,
        };

        return (
            <React.Fragment>
                <GroupSelectable enabled={true} onSelection={this._handleDragAndSelect}>
                    {({isSelecting}) => (
                        <Table
                            data={data}
                            rowStyle={{
                                padding: "10px 16px",
                                textAlign: "left",
                                backgroundColor: Constants.system.white,
                            }}
                            topRowStyle={{
                                padding: "0px 16px",
                                textAlign: "left",
                                backgroundColor: Constants.system.white,
                            }}
                            onMouseEnter={(i) => {
                                if (isSelecting) return;
                                this._handleCheckBoxMouseEnter(i);
                            }}
                            onMouseLeave={() => {
                                if (isSelecting) return;
                                this._handleCheckBoxMouseEnter();
                            }}
                            isShiftDown={this.isShiftDown}
                        />
                    )}
                </GroupSelectable>
                {footer}
                {this.state.modalShow && (
                    <ConfirmationModal
                        type={"DELETE"}
                        withValidation={false}
                        callback={this._handleDelete}
                        header={`Are you sure you want to delete the selected files?`}
                        subHeader={`These files will be deleted from all connected collections and your file library. You can’t undo this action.`}
                    />
                )}
                {this.state.keplrShow && (
                    <KeplrConfirmationModal
                        callback={this._handleEnableKeplrWalletAndRegisterISCN}
                        header={`Keplr wallet must be connected`}
                        subHeader={`To register for ISCN, you need to connect to the Keplr wallet.`}
                    />
                )}
                <input
                    ref={(c) => {
                        this._ref = c;
                    }}
                    readOnly
                    value={this.state.copyValue}
                    css={STYLES_COPY_INPUT}
                />
            </React.Fragment>
        );
    }
}

export default withSnackbar(DataView);