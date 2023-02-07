import styled from "@emotion/styled";
import TreeItem, { TreeItemProps } from "@mui/lab/TreeItem";
import { Box, Typography } from "@mui/material";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { makeStyles } from "@mui/styles";
import React from "react";

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
};

const useTreeItemStyles = makeStyles(() => ({
  root: {
    color: "black",
    "&:focus > $content": {
      backgroundColor: `var(--tree-view-bg-color, black`,
      color: "var(--tree-view-color)",
    },
  },
  content: {
    color: "black",
    paddingRight: 1,
    fontWeight: "2rem",
    "$expanded > &": {
      fontWeight: "4rem",
    },
  },
  group: {
    marginLeft: 12,
    borderLeft: "1px dashed eblu, 0.4",
  },
  expanded: {},
  label: {
    fontWeight: "inherit",
    color: "inherit",
    width: "auto",
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: 0.5,
  },
  labelIcon: {
    marginRight: 1,
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1,
  },
}));

const CustomTreeItem: React.FC<StyledTreeItemProps> = (props) => {
  const classes = useTreeItemStyles();
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;
  return (
    <TreeItem
      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      {...other}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        group: classes.group,
        label: classes.label,
      }}
    />
  );
};

export default CustomTreeItem;
