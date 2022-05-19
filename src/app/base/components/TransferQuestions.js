import React from 'react';

import { Transfer, Table, Tag } from 'antd';
import difference from 'lodash/difference';
import 'antd/dist/antd.css';

// Customize Table Transfer
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
    <Transfer {...restProps}>
        {({
            direction,
            filteredItems,
            onItemSelectAll,
            onItemSelect,
            selectedKeys: listSelectedKeys,
            disabled: listDisabled,
        }) => {
            const columns = direction === 'left' ? leftColumns : rightColumns;

            const rowSelection = {
                getCheckboxProps: item => {
                    return ({ disabled: listDisabled || item.disabled })
                },
                onSelectAll(selected, selectedRows) {
                    const treeSelectedKeys = selectedRows
                        .filter(item => !item.disabled)
                        .map(({ key }) => key);
                    const diffKeys = selected
                        ? difference(treeSelectedKeys, listSelectedKeys)
                        : difference(listSelectedKeys, treeSelectedKeys);
                    onItemSelectAll(diffKeys, selected);
                },
                onSelect({ key }, selected) {
                    onItemSelect(key, selected);
                },
                selectedRowKeys: listSelectedKeys,
            };
            return (
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={filteredItems}
                    size="small"
                    style={{ pointerEvents: listDisabled ? 'none' : null }}
                    onRow={({ key, disabled: itemDisabled }) => ({
                        onClick: () => {
                            if (itemDisabled || listDisabled) return;
                            onItemSelect(key, !listSelectedKeys.includes(key));
                        },
                    })}
                />
            );
        }}
    </Transfer>
);

const leftTableColumns = [
    {
        dataIndex: 'key',
        title: 'ID',
    },
    {
        dataIndex: 'topic',
        title: 'Topic',
        render: topic => <Tag>{topic}</Tag>,
    },
    {
        dataIndex: 'question',
        title: 'Question',
    },
];
const rightTableColumns = [
    {
        dataIndex: 'key',
        title: 'ID',
    },
    {
        dataIndex: 'topic',
        title: 'Topic',
        render: topic => <Tag>{topic}</Tag>,
    },
    {
        dataIndex: 'question',
        title: 'Question',
    },
];

const TransferQuestions = ({ data, questions, setQuestions }) => {

    const handleOnChange = (nextTargetKeys, direction, moveKeys) => {
        setQuestions(nextTargetKeys)
    };

    return (
        <>
            <TableTransfer
                dataSource={data}
                targetKeys={questions}
                showSearch
                onChange={handleOnChange}
                filterOption={(inputValue, item) =>
                    item.id.indexOf(inputValue) !== -1 || item.question.indexOf(inputValue) !== -1
                }
                leftColumns={leftTableColumns}
                rightColumns={rightTableColumns}
            />
        </>
    );
}

export default TransferQuestions;