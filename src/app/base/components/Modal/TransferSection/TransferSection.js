import React, { useState } from "react";

import { Transfer } from "antd";
import "./TransferSection.css";
import "antd/dist/antd.css";

const TransferSection = ({ data, sections, setSections }) => {
  const [selectedKeys, setSelectedKeys] = useState([]);

  const onChange = (nextTargetKeys, direction, moveKeys) => {
    console.log(nextTargetKeys);
    setSections(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  return (
    <>
      <Transfer
        className="transfer-section"
        dataSource={data}
        targetKeys={sections}
        selectedKeys={selectedKeys}
        showSearch
        onChange={onChange}
        onSelectChange={onSelectChange}
        filterOption={(inputValue, item) => {
          return (
            item._id?.toLowerCase().indexOf(inputValue) !== -1 ||
            item.title?.toLowerCase().search(inputValue) !== -1
          );
        }}
        pagination
        render={(item) => item.title}
      />
    </>
  );
};

export default TransferSection;
