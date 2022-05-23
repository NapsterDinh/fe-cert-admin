import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from '@themesberg/react-bootstrap';
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const TableDragDrop = ({ columns, dataSet }) => {
  const [data, setData] = useState(dataSet);

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(data);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setData(tempData);
  };

  return (
    <div className="App mt-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Table striped bordered hover responsive className="table borderd">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Title</th>
              <th>Topic</th>
              <th>Slug</th>
              <th>Last Updated</th>
              <th />
            </tr>
          </thead>
          <Droppable droppableId="droppable-1">
            {(provider) => (
              <tbody
                className="text-capitalize"
                ref={provider.innerRef}
                {...provider.droppableProps}
              >
                {data?.map((item, index) => (
                  <Draggable
                    key={item?._id}
                    draggableId={item?._id}
                    index={index}
                  >
                    {(provider) => (
                      <tr {...provider.draggableProps} ref={provider.innerRef}>
                        <td {...provider.dragHandleProps}>
                            <FontAwesomeIcon icon={faAlignJustify} />
                        </td>
                        <td>{item?._id}</td>
                        <td>{item?.title}</td>
                        <td>{item?.topic?.title}</td>
                        <td>
                            <a href={item?.slug}>{item?.slug}</a>
                        </td>
                        <td>{item?.createdAt}</td>
                        <td>View Details</td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provider.placeholder}
              </tbody>
            )}
          </Droppable>
        </Table>
      </DragDropContext>
    </div>
  );
};

export default TableDragDrop;
