/**
 * @file App.js
 * @author liangxiaojun
 */

import React, {useState, useCallback} from 'react';

// Components
import {Dropdown} from 'antd';
import Brand from './brand/Brand';
import MarqueeTable from './marqueeTable/MarqueeTable';
import FileSelector from './fileSelector/FileSelector';
import ContextMenu from './contextMenu/ContextMenu';

// Styles
import 'scss/App.scss';

function App() {

    const

        /**
         * table data
         * @type {object}
         *
         * {
         *     head: {array},
         *     body: {array}
         * }
         */
        [data, setData] = useState(null),

        /**
         * table page size
         * @type {integer}
         */
        [pageSize, setPageSize] = useState(5),

        /**
         * auto pagging interval
         * @type {integer}
         */
        [interval, setInterval] = useState(10000),

        [contextMenuVisible, setContextMenuVisible] = useState(false),

        showContextMenu = useCallback(visible => setContextMenuVisible(visible)),
        hideContextMenu = useCallback(() => setContextMenuVisible(false));

    return (
        <Dropdown visible={contextMenuVisible}
                  overlay={<ContextMenu onRequestClose={hideContextMenu}/>}
                  trigger={['contextMenu']}
                  onVisibleChange={showContextMenu}>
            <div className="app">

                <Brand/>

                {
                    data ?
                        <MarqueeTable data={data}
                                      pageSize={pageSize}
                                      interval={interval}/>
                        :
                        <FileSelector onChange={setData}/>
                }

                <div className="mac-title-bar"></div>

            </div>
        </Dropdown>
    );

}

export default App;
