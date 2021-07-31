/** @jsx jsx */
import { jsx, css } from "@emotion/react";

const loader = css`
  width: 100%;
  height: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
  position: absolute;
  display: flex;
  font-size: calc(10px + 2vmin);
`;

function Loading(){
    return (
        <div>
            <div css={loader} className="loader" id="loader">
                <div className="square"/>
                <div className="square"/>
                <div className="square"/>
                <div className="square"/>
                <div className="square"/>
            </div>
        </div>
    );
}

export default Loading;