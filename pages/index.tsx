import { richData } from "../components/data";
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";

import CustomTreeView from "../components/CustomTreeView";
import AddNode from "../components/AddNode";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [treeData, setTreeData] = useState(richData);
  const [expanded, setExpanded] = useState<string[]>();
  const [showAddModal, setShowAddModal] = useState(false);

  const handleChange = (event: any) => {
    if (!event.target.value) setExpanded(["root"]);
    setSearchValue(event.target.value);
    searchTree(event.target.value);

    // const dataTofilter = [richData];

    // const matchedIDS: string[] = [];
    // // find all items IDs that matches our search (or their children does)
    // const filtered = filterBy(richData, term, matchedIDS);

    // setTreeData(filtered);
    // setExpanded(matchedIDS);
  };

  // function filterBy(arr, query, matchedIDS: string[]) {
  //   return query
  //     ? arr.reduce((acc, item) => {
  //         if (item.children?.length) {
  //           const filtered = filterBy(item.children, query, matchedIDS);
  //           if (filtered.length) {
  //             matchedIDS.push(item.id);
  //             return [...acc, { ...item, children: filtered }];
  //           }
  //         }

  //         const { children, ...itemWithoutChildren } = item;
  //         if (item.name?.toLowerCase().includes(query.toLowerCase())) {
  //           matchedIDS.push(item.id);
  //           return [...acc, itemWithoutChildren];
  //         } else return acc;
  //       }, [])
  //     : arr;
  // }

  const filterFunc = (value: string, searchTerm: string) =>
    value.toLowerCase().includes(searchTerm);

  const searchTree = (searchTerm: string) => {
    searchTerm = searchTerm.toLowerCase().trim();
    // if (searchTerm === "") {
    //   console.log("called");
    //   return setTreeData(richData);
    // }
    let nodesToExpand: string[] = [];
    function dig(list: any) {
      return list
        .map((treeNode: any) => {
          const { children } = treeNode;
          const match = filterFunc(treeNode.name, searchTerm);
          const childList = dig(children || []);
          if (match || childList.length) {
            nodesToExpand.push(treeNode.id);
            return {
              ...treeNode,
              children: childList,
            };
          }
          return null;
        })
        .filter((node: any) => node);
    }
    setExpanded(nodesToExpand);
    setTreeData(dig(richData));
  };

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Box>
        <Box>
          <Button onClick={() => setShowAddModal(true)}>Add File</Button>
        </Box>
        <TextField
          label="Search"
          onChange={handleChange}
          value={searchValue}
          style={{ margin: "10px 0", width: 300 }}
        />
        <Box>
          <CustomTreeView
            treeData={treeData}
            expandedNodes={expanded}
            searchTerm={searchValue}
          />
        </Box>
      </Box>

      {showAddModal && (
        <AddNode
          setShowAddModal={setShowAddModal}
          treeData={treeData}
          setTreeData={setTreeData}
        />
      )}
    </Box>
  );
}
