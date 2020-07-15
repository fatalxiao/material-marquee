/**
 * @file ContextMenu.js
 * @author liangxiaojun
 */

import React, {useCallback} from 'react';

// Components
import {Menu} from 'antd';

// Vendors
import screenfull from 'screenfull';

// Styles
import 'scss/contextMenu/ContextMenu.scss';

function ContextMenu({onRequestClose}) {

    const isFullscreen = screenfull.isFullscreen,

        toggleFullScreen = useCallback(() => {
            screenfull.toggle();
            onRequestClose?.();
        });

    return (
        <Menu className="context-menu">
            <Menu.Item onClick={toggleFullScreen}>
                {isFullscreen ? '退出全屏' : '全屏'}
            </Menu.Item>
        </Menu>
    );

}

export default ContextMenu;
