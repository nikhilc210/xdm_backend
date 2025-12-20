import { render } from "@testing-library/react";
import { Table, Button, Popconfirm } from "antd";
import moment from "moment";

const VideoTable = ({ data, onEdit, onDelete }) => {
  const columns = [
    {
      title: "Video ID",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Date Published",

      key: "date",
      render: (_, record) => <>{moment(_.publishedAt).format("DD/MM/YYYY")}</>,
    },
    {
      title: "Video Title",
      dataIndex: "videoTitle",
      key: "videoTitle",
    },
    {
      title: "Youtube Video ID",
      dataIndex: "youtubeVideoId",
      key: "youtubeVideoId",
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="d-flex gap-2">
          <Button
            type="link"
            onClick={() => onEdit(record)}
            className="text-primary p-0"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this video?"
            onConfirm={() => onDelete(_._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger className="p-0">
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{ pageSize: 10 }}
    />
  );
};

export default VideoTable;
