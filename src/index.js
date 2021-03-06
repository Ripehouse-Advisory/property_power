/* global chrome */

import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import { isAuthenticated } from './utils/authentication.js';
import App from './views/Popup/App';
import { isHousePage } from './utils/helper.js';
import './assets/fonts/paladinscond.ttf';
import 'normalize.css';
import './variables.css';

/**
 * Temporary workaround for secondary monitors on MacOS where redraws don't happen
 * @See https://bugs.chromium.org/p/chromium/issues/detail?id=971701
 */
if (
  // From testing the following conditions seem to indicate that the popup was opened on a secondary monitor
  window.screenLeft < 0 ||
  window.screenTop < 0 ||
  window.screenLeft > window.screen.width ||
  window.screenTop > window.screen.height
) {
  chrome.runtime.getPlatformInfo(function (info) {
    if (info.os === 'mac') {
      const fontFaceSheet = new CSSStyleSheet();
      fontFaceSheet.insertRule(`
        @keyframes redraw {
          0% {
            opacity: 1;
          }
          100% {
            opacity: .99;
          }
        }
      `);
      fontFaceSheet.insertRule(`
        html {
          animation: redraw 1s linear infinite;
        }
      `);
      document.adoptedStyleSheets = [
        ...document.adoptedStyleSheets,
        fontFaceSheet,
      ];
    }
  });
}

chrome.tabs.query(
  { active: true, currentWindow: true },
  async function (tab) {
    //Get Url Before render, and pass it to router
    const currentUrl = tab[0].url;
    const isPropertyPage = isHousePage(currentUrl);
    const isLogin = await isAuthenticated();

    ReactDOM.render(
      <React.StrictMode>
        <MemoryRouter>
          <App isPropertyPage={isPropertyPage} isLogin={isLogin} />
        </MemoryRouter>
      </React.StrictMode>,
      document.getElementById('root'),
    );
  },
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
