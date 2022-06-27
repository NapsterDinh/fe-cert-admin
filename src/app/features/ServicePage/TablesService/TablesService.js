import { SearchOutlined } from "@ant-design/icons";
import { Card } from "@themesberg/react-bootstrap";
import { Button, Input, Space, Table, Tag } from "antd";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { clientURL } from "configuration";
import "./TablesService.css";

export const TablesService = ({ data, editExam, deleteExam }) => {
  console.log(data);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      sorter: (a, b) => {
        return a.name < b.name;
      },
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("name"),
    },
    {
      title: "Number of Payment",
      dataIndex: "numberOfPayment",
      key: "numberOfPayment",
      width: "10%",
      align: "center",
      sorter: (a, b) => {
        return a.numberOfPayment < b.numberOfPayment;
      },
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("numberOfPayment"),
    },
    {
      title: "Revenue($)",
      dataIndex: "revenue",
      key: "revenue",
      align: "center",
      width: "10%",
      sorter: (a, b) => {
        return a.revenue < b.revenue;
      },
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("revenue"),
    },
    {
      title: "Number of User",
      dataIndex: "numberOfUser",
      key: "numberOfUser",
      align: "center",
      width: "10%",
      sorter: (a, b) => {
        return a.numberOfUser < b.numberOfUser;
      },
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("numberOfUser"),
    },
    {
      title: "Last Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: "10%",
      align: "center",
      ...getColumnSearchProps("updatedAt"),
      sorter: (a, b) => new Date(a.updatedAt) < new Date(b.updatedAt),
      sortDirections: ["descend", "ascend"],
      render: (updateAt) => {
        return <span>{new Date(updateAt).toLocaleString()}</span>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      align: "center",
      ...getColumnSearchProps("status"),
      sorter: (a, b) => a.status < b.status,
      sortDirections: ["descend", "ascend"],
      render: (status) => {
        let color =
          status === "public"
            ? "geekblue"
            : status === "private"
            ? "green"
            : "red";
        return (
          <span>
            <Tag color={color} key={status}>
              {status}
            </Tag>
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      align: "center",
      render: (_, record) => {
        return (
          <Space size="middle">
            <Button onClick={() => editExam(record)}>Edit</Button>
            <Button type="primary" danger onClick={() => deleteExam(record)}>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="mt-3">
        <Table columns={columns} dataSource={data} />
      </Card.Body>
    </Card>
  );
};

export default TablesService;
