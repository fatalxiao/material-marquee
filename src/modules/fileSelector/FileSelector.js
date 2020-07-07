/**
 * @file FileSelector.js
 * @author liangxiaojun
 */

import React, {useRef, useState, useCallback} from 'react';
import PropTypes from 'prop-types';

// Components
import {Button} from 'antd';
import {FileExcelOutlined} from '@ant-design/icons';

// Vendors
import XLSX from 'xlsx';

// Styles
import 'scss/fileSelector/FileSelector.scss';

function FileSelector({onChange}) {

    const

        /**
         * file input element reference
         * @type {object}
         */
        uploadField = useRef(),

        /**
         * file input react component key
         * @type {number}
         */
        [uploadFieldKey, setUploadFieldKey] = useState(1),

        /**
         * parse excel file error message
         * @type {string}
         */
        [errorMsg, setErrorMsg] = useState(''),

        /**
         * handle button click, fire file input click event
         */
        handleClick = useCallback(() => {
            uploadField?.current?.click?.();
        }),

        /**
         * handle file input value change
         */
        handleChange = useCallback(() => {

            // reset error message
            setErrorMsg('');

            const reader = new FileReader(),
                file = uploadField?.current.files[0];

            reader.onload = event => {
                try {

                    const data = event.target.result,
                        workbook = XLSX.read(data, {type: 'binary'});

                    // transform to json and return to parent
                    onChange?.({
                        head: XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
                            header: 1
                        })[0],
                        body: XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
                    });

                } catch (e) {
                    setErrorMsg('读取文件失败，请重试！');
                } finally {
                    // update uploadFieldKey to force to update file input element
                    setUploadFieldKey(uploadFieldKey + 1);
                }
            };

            // readAsBinaryString for XLSX
            reader.readAsBinaryString(file);

        }, [uploadFieldKey]);

    return (
        <div className="file-selector">

            <input key={uploadFieldKey}
                   ref={uploadField}
                   className="upload-field"
                   type="file"
                   name="file"
                   onChange={handleChange}/>

            <Button className="file-selector-button"
                    type="primary"
                    icon={<FileExcelOutlined/>}
                    onClick={handleClick}>
                选择文件...
            </Button>

            <div className="error-msg">{errorMsg}</div>

        </div>
    );

}

FileSelector.propTypes = {
    onChange: PropTypes.func
};

export default FileSelector;
