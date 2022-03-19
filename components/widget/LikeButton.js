import React, { Component } from "react";
import {css} from "@emotion/react";

const BUTTON_WHITE = css`
  width: max-content;
  text-align: center;
  color: #fff !important;
  background: #f16464;
  border-radius: 0;
  letter-spacing: normal;
  outline: 0;
  font-weight: 800;
  text-decoration: none;
  padding: 8px 40px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
`;


class LikeButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            liked: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            liked: !this.state.liked
        });
    }

    render() {
        const text = this.state.liked ? "liked" : "haven't liked";
        const label = this.state.liked ? "Unlike" : "Like";

        return (
            <div>
                <button css={BUTTON_WHITE} onClick={this.handleClick}>
                    {label}
                </button>
            </div>
        );
    }
}

export default LikeButton;
