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

    const uploadField = useRef(),

        [uploadFieldKey, setUploadFieldKey] = useState(1),
        [errorMsg, setErrorMsg] = useState(''),

        /**
         * 处理选择按钮点击
         */
        handleClick = useCallback(() => {
            uploadField?.current?.click?.();
        }),

        /**
         * 处理 file 选择变更
         */
        handleChange = useCallback(() => {

            setErrorMsg('');

            const reader = new FileReader(),
                file = uploadField?.current.files[0];

            reader.onload = event => {
                try {

                    const data = event.target.result,
                        workbook = XLSX.read(data, {type: 'binary'});

                    // 转换成 json 格式后返回
                    onChange?.({
                        head: XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
                            header: 1
                        })[0],
                        body: XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
                    });

                } catch (e) {
                    setErrorMsg('读取文件失败，请重试！');
                } finally {
                    // 更新 file input 的 key，强制重绘
                    setUploadFieldKey(uploadFieldKey + 1);
                }
            };

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
