/**
 * @file MarqueeTable.js
 * @author liangxiaojun
 */

import React, {useMemo, useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';

// Components
import {Table} from 'antd';

import isArray from 'lodash/isArray';

function MarqueeTable({data, pageSize, interval}) {

    let loopId = null;

    const [page, setPage] = useState(0),

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

        dataSource = useMemo(() => {

            if (!data?.body || !isArray(data?.body) || data?.body.length < 1) {
                return [];
            }

            const result = data?.body.slice(page * pageSize, (page + 1) * pageSize);

            if (result.length < pageSize) {
                return [...result, ...new Array(pageSize - result.length).fill({})];
            }

            return result;

        }, [data, page, pageSize]),

        handleLoop = useCallback(() => {

            const len = data?.body?.length || 0,
                nextPage = page + 1;

            if (nextPage * pageSize >= len) {
                setPage(0);
            } else {
                setPage(nextPage);
            }

            startLoop();

        }, [loopId, data, page, pageSize]),

        startLoop = useCallback(() => {
            destroyLoop();
            loopId = setTimeout(() => {
                handleLoop();
            }, interval);
        }),

        destroyLoop = useCallback(() => {
            loopId && clearTimeout(loopId);
        });

    useEffect(() => {

        startLoop();

        return () => destroyLoop();

    }, [page]);

    return (
        <div className="marquee-table">
            <Table columns={columns}
                   dataSource={dataSource}
                   pagination={false}
                   rowKey={data?.head?.[0]}/>
        </div>
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
