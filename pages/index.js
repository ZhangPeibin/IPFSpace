import React from 'react';
import Particle from '../components/widget/Particle';
import SliderMainParticle from '../components/widget/SliderMainParticle';
import {createGlobalStyle} from 'styled-components';
import {css} from "@emotion/react";
import * as Constants from "../common/constants";
import FeatureBox from '../components/widget/FeatureBox';
import Faq from 'react-faq-component';
import Script from "next/script";
import WebsitePrototypeWrapper from "../components/core/WebsitePrototypeWrapper";

const img = css`
  width: 427px;
  height: 240px;
  @media (max-width: ${Constants.sizes.mobile}px) {
    height: 180px;
  }
`;

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }

  header#myHeader.navbar .search #quick_search {
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }

  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a {
    color: #fff;
  }

  header#myHeader .dropdown-toggle::after {
    color: #fff;
  }

  header#myHeader .logo .d-block {
    display: none !important;
  }

  header#myHeader .logo .d-none {
    display: block !important;
  }

  @media only screen and (max-width: 1199px) {
    .navbar {
      background: #403f83;
    }

    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2 {
      background: #fff;
    }

    .item-dropdown .dropdown a {
      color: #fff !important;
    }
  }
`;

const title = `IStorage - Cross-Chain Data marketplace`;

const homeone = () => {
    return (
        <WebsitePrototypeWrapper title={title}>
            <Script src="/js/jquery-3.6.0.min.js" />
            <Script src="/js/bootstrap.bundle.min.js" />
            <Script src="/js/all.min.js" />
            <Script src="/js/swiper-bundle.min.js" />
            <Script src="/js/aos.js" />
            <div>
                <GlobalStyles/>
                <section style={{paddingTop:0,paddingBottom:0}}>
                    <Particle/>
                    <SliderMainParticle/>
                </section>
            </div>

        </WebsitePrototypeWrapper>
    )
}
export default homeone;