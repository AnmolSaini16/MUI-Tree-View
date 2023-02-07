import { TreeView } from "@mui/lab";
import React, { useEffect, useState } from "react";
import CustomTreeItem from "../components/CustomTreeItem";
import FolderIcon from "@mui/icons-material/Folder";
import ArticleIcon from "@mui/icons-material/Article";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface props {
  treeData: any;
  expandedNodes: string[] | undefined;
  searchTerm: string;
}

const CustomTreeView: React.FC<props> = ({
  treeData,
  expandedNodes,
  searchTerm,
}) => {
  const [selectedNode, setSelectedNode] = useState<string[] | string>();

  const getIcon = (node: any) => {
    // if (!node.id) return;
    if (node.isFolder) return FolderIcon;
    return ArticleIcon;
  };

  //   const filterFunc = (value: string, searchTerm: string) =>
  //     value.toLowerCase().includes(searchTerm);

  const renderTree = (node: any) => {
    return node.map((treeItemData: any) => {
      let children = undefined;
      if (treeItemData.children && treeItemData.children.length > 0) {
        children = renderTree(treeItemData.children);
      }
      return (
        <CustomTreeItem
          key={treeItemData.id}
          nodeId={treeItemData.id}
          labelText={treeItemData.name}
          children={children}
          labelIcon={getIcon(treeItemData)}
          //   highlight={filterFunc(treeItemData.name, searchTerm)}
        />
      );
    });
  };

  const handleNodeSelect = (value: string | string[]) => {
    setSelectedNode(value);
  };

  return (
    <>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        // expanded={expanded}
        // onNodeToggle={(event, value) => handleToggle(value)}
        // onNodeSelect={(
        //   event: React.SyntheticEvent,
        //   nodeIds: Array<string> | string
        // ) => handleNodeSelect(nodeIds)}
        defaultExpanded={["1"]}
        sx={{
          minWidth: 400,
          overflow: "hidden",
        }}
      >
        {renderTree(treeData)}
      </TreeView>
    </>
  );
};

export default CustomTreeView;
