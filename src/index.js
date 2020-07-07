/**
 * @file index.js
 * @author liangxiaojun
 */

'use strict';

import '@babel/polyfill';

import React from 'react';
import {render} from 'react-dom';

// Components
import App from 'modules/App';

// Styles
import 'antd/dist/antd.css';
import 'scss/global.scss';

function renderAppContainer() {
    render(
        <App/>,
        document.getElementById('app-container')
    );
}

renderAppContainer();

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('src/modules/App', renderAppContainer);
}
