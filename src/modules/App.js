/**
 * @file App.js
 * @author liangxiaojun
 */

import React, {useState} from 'react';

// Components
import Brand from './brand/Brand';
import MarqueeTable from './marqueeTable/MarqueeTable';
import FileSelector from './fileSelector/FileSelector';

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
        [interval, setInterval] = useState(2000);

    return (
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

        </div>
    );

}

export default App;
