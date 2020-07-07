/**
 * @file MarqueeTable.js
 * @author liangxiaojun
 */

import React, {useMemo, useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';

// Components
import {Table} from 'antd';

// Styles
import 'scss/marqueeTable/MarqueeTable.scss';

function MarqueeTable({data, pageSize, interval}) {

    let loopId = null;

    const

        /**
         * table page no
         * @type {integet}
         */
        [page, setPage] = useState(1),

        /**
         * table columns config
         * @type {array}
         */
        columns = useMemo(() => {
            return data?.head ?
                data.head.map(item => ({
                    key: item,
                    title: item,
                    dataIndex: item
                }))
                :
                [];
        }, [data]),

        /**
         * excel file data rows length
         * @type {integet}
         */
        dataLength = useMemo(() => data?.body?.length || 0, [data]),

        /**
         * table data
         * @type {array}
         */
        dataSource = useMemo(() => {

            if (dataLength < 1) {
                return [];
            }

            const remainder = dataLength % pageSize,

                // fill rows data if remainder is not empty
                result = remainder === 0 ?
                    data?.body
                    :
                    [...data?.body, ...new Array(pageSize - remainder).fill({})];

            // add row data key before return
            return result.map((item, index) => ({
                ...item,
                key: `${index}`
            }));

        }, [data, pageSize]),

        /**
         * handle table cycle display loop
         */
        handleLoop = useCallback(() => {

            const nextPage = page + 1;

            // if next page no is greater than max page no, reset to first page
            if ((nextPage - 1) * pageSize >= dataLength) {
                setPage(1);
            } else {
                setPage(nextPage);
            }

            // start next loop
            startLoop();

        }, [loopId, data, page, pageSize]),

        /**
         * use setTimeout to start loop to display each page of table
         */
        startLoop = useCallback(() => {
            destroyLoop();
            loopId = setTimeout(() => {
                handleLoop();
            }, interval);
        }),

        /**
         * use clearTimeout to destroy loop
         */
        destroyLoop = useCallback(() => {
            loopId && clearTimeout(loopId);
        });

    useEffect(() => {

        // start loop at mount
        startLoop();

        // destroy loop before unmount
        return () => destroyLoop();

    }, [page]);

    return (
        <Table className="marquee-table"
               columns={columns}
               dataSource={dataSource}
               page={page}
               pagination={{
                   current: page,
                   pageSize
               }}
               rowKey="key"/>
    );

}

MarqueeTable.propTypes = {

    data: PropTypes.shape({
        head: PropTypes.array,
        body: PropTypes.array
    }),

    pageSize: PropTypes.number,
    interval: PropTypes.number

};

export default MarqueeTable;
