/**
 * @file App.js
 * @author liangxiaojun
 */

import React, {useState} from 'react';

// Components
import MarqueeTable from './marqueeTable/MarqueeTable';
import FileSelector from './fileSelector/FileSelector';

// Styles
import 'scss/App.scss';

function App() {

    const [data, setData] = useState(null),
        [pageSize, setPageSize] = useState(5),
        [interval, setInterval] = useState(2000);

    return (
        <div className="app">
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
