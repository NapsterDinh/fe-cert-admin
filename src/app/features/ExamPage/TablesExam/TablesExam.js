import { SearchOutlined } from "@ant-design/icons";
import { Card } from "@themesberg/react-bootstrap";
import { Button, Input, Space, Table, Tag } from "antd";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { clientURL } from "configuration";
import "./TableExam.css";

export const TableExam = ({ data, editExam, deleteExam, showDetail }) => {
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
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "20%",
      sorter: (a, b) => {
        return a.title < b.title;
      },
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("title"),
    },
    {
      title: "Number of Examinees",
      dataIndex: "numberExaminees",
      key: "numberExaminees",
      width: "15%",
      align: "center",
      sorter: (a, b) => a.numberExaminees < b.numberExaminees,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("numberExaminees"),
    },
    // {
    //   title: "Pass rate",
    //   dataIndex: "passRate",
    //   key: "passRate",
    //   width: "15%",
    //   align: "center",
    //   sorter: (a, b) => a.passRate < b.passRate,
    //   sortDirections: ["descend", "ascend"],
    //   ...getColumnSearchProps("passRate"),
    // },
    {
      title: "Total of Questions",
      dataIndex: "total_of_questions",
      key: "topic",
      width: "15%",
      align: "center",
      sorter: (a, b) => a.total_of_questions < b.total_of_questions,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("total_of_questions"),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "10%",
      align: "center",
      ...getColumnSearchProps("createdAt"),
      sorter: (a, b) => new Date(a.createdAt) < new Date(b.createdAt),
      sortDirections: ["descend", "ascend"],
      render: (createdAt) => {
        return <span>{new Date(createdAt).toLocaleString()}</span>;
      },
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
      dataIndex: "isPublic",
      key: "isPublic",
      width: "10%",
      align: "center",
      ...getColumnSearchProps("isPublic"),
      sorter: (a, b) => a.isPublic < b.isPublic,
      sortDirections: ["descend", "ascend"],
      render: (isPublic) => {
        let color = isPublic === "Public" ? "geekblue" : "green";
        return (
          <span>
            <Tag color={color} key={isPublic}>
              {isPublic}
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
            {/* <Button onClick={() => showDetail(record)}>View Detail</Button> */}
            <Button onClick={() => editExam(record._id)}>Edit</Button>
            <Button
              type="primary"
              danger
              onClick={() => deleteExam(record._id)}
            >
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

export default TableExam;
