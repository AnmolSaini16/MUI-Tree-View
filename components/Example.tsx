import React from "react";
import PropTypes from "prop-types";
import { fade, makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import TextField from "@material-ui/core/TextField";

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    "&:focus > $content": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: "var(--tree-view-color)",
    },
  },
  content: {
    color: theme.palette.text.secondary,
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "$expanded > &": {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 12,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
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
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1,
  },
}));

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const data = [
  {
    name: "world",
    id: "world",
    children: [
      {
        name: "asia",
        id: "asia",
        children: [
          {
            name: "india",
            id: "india",
            children: [
              {
                name: "tamilnadu",
                id: "tamilnadu",
                children: [
                  {
                    name: "chennai",
                    id: "chennai",
                    children: [
                      {
                        name: "thiruvanmiyur",
                        id: "thiruvanmiyur",
                      },
                      {
                        name: "kelambakkam",
                        id: "kelambakkam",
                      },
                    ],
                  },
                  {
                    name: "madurai",
                    id: "madurai",
                    children: [
                      {
                        name: "mattuthavani",
                        id: "mattuthavani",
                      },
                    ],
                  },
                ],
              },
              {
                name: "andhrapradesh",
                id: "andhrapradesh",
                children: [
                  {
                    name: "vijayawada",
                    id: "vijayawada",
                    children: [
                      {
                        name: "satyanarayanapuram",
                        id: "satyanarayanapuram",
                      },
                    ],
                  },
                ],
              },
              {
                name: "telangana",
                id: "telangana",
                children: [
                  {
                    name: "hyderabad",
                    id: "hyderabad",
                    children: [
                      {
                        name: "dilsukhnagar",
                        id: "dilsukhnagar",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "china",
            id: "china",
            children: [
              {
                name: "hubei",
                id: "hubei",
                children: [
                  {
                    name: "wuhan",
                    id: "wuhan",
                  },
                ],
              },
            ],
          },
          {
            name: "japan",
            id: "japan",
            children: [
              {
                name: "place honshu",
                id: "honshu",
                children: [
                  {
                    name: "tokyo",
                    id: "tokyo",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "north america",
        id: "northamerica",
        children: [
          {
            name: "usa",
            id: "usa",
            children: [
              {
                name: "place california",
                id: "california",
                children: [
                  {
                    name: "losangeles",
                    id: "losangeles",
                    children: [
                      {
                        name: "hollywood",
                        id: "hollywood",
                      },
                    ],
                  },
                  {
                    name: "sanfrancisco",
                    id: "sanfrancisco",
                    children: [
                      {
                        name: "goldengate",
                        id: "goldengate",
                      },
                    ],
                  },
                ],
              },
              {
                name: "florida",
                id: "florida",
                children: [
                  {
                    name: "miami",
                    id: "miami",
                    children: [
                      {
                        name: "place Vizcaya",
                        id: "Vizcaya",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

function StyledTreeItem(props) {
  const { labelText, ...other } = props;
  const classes = useTreeItemStyles();
  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
        </div>
      }
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const filterFunc = (value, searchTerm) =>
  value.toLowerCase().includes(searchTerm);

export default function PlaceTreeView() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [expandNodes, setExpandNodes] = React.useState([]);
  const [options, setOptions] = React.useState(data);
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    searchTree(event.target.value);
  };

  const getTreeItemsFromData = (treeItems) => {
    return treeItems.map((treeItemData) => {
      let children = undefined;
      if (treeItemData.children && treeItemData.children.length > 0) {
        children = getTreeItemsFromData(treeItemData.children);
      }
      return (
        <StyledTreeItem
          key={treeItemData.id}
          nodeId={treeItemData.id}
          labelText={treeItemData.name}
          children={children}
          highlight={filterFunc(treeItemData.name, searchTerm)}
        />
      );
    });
  };

  const searchTree = (searchTerm) => {
    searchTerm = searchTerm.toLowerCase().trim();
    if (searchTerm === "") {
      return data;
    }
    let nodesToExpand = [];
    function dig(list) {
      return list
        .map((treeNode) => {
          const { children } = treeNode;
          const match = filterFunc(treeNode.name, searchTerm);
          const childList = dig(children || [], match);
          if (match || childList.length) {
            nodesToExpand.push(treeNode.id);
            return {
              ...treeNode,
              children: childList,
            };
          }
          return null;
        })
        .filter((node) => node);
    }
    setExpandNodes(nodesToExpand);
    setOptions(dig(data));
  };

  let treeViewProps = {};
  if (searchTerm.trim() !== "") {
    treeViewProps = { expanded: expandNodes };
  }

  console.log("treeviewprops", treeViewProps);
  return (
    <div style={{ margin: "20px", display: "flex", flexDirection: "column" }}>
      <TextField
        style={{ width: "200px", marginBottom: "10px" }}
        id="standard-basic"
        label="Search place"
        onChange={handleSearchTermChange}
      />
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        // expanded={expandNodes}
        {...treeViewProps}
        defaultEndIcon={<div style={{ width: 24 }} />}
      >
        {getTreeItemsFromData(options)}
      </TreeView>
    </div>
  );
}
