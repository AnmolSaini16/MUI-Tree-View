import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { addDataToId, flattenArray, getLastId, searchTree } from "./utils";

interface props {
  setShowAddModal: (value: boolean) => void;
  treeData: any;
  setTreeData: (value: any) => void;
}

interface AddModal {
  name: string;
  parent: string;
}

const AddNode: React.FC<props> = ({
  setShowAddModal,
  treeData,
  setTreeData,
}) => {
  const [formValues, setFormValues] = useState<AddModal>({
    name: "",
    parent: "",
  });

  const handleFormChange = (key: any, value: any) => {
    const updatedFormValues = { ...formValues, [key]: value };
    setFormValues(updatedFormValues);
  };

  const handleSubmit = async () => {
    const previousTreeData = [...treeData];
    const previousData = flattenArray(previousTreeData);
    const lastId = +getLastId(previousData) + 1;
    const payload = [
      {
        scenarioId: "",
        name: formValues.name,
        id: `${lastId}`,
        isFolder: false,
      },
    ];
    const parentId = searchTree(previousTreeData[0], formValues.parent);
    addDataToId(previousTreeData, parentId!, payload);
    setTreeData(previousTreeData);

    setShowAddModal(false);
  };

  console.log(treeData);

  return (
    <Dialog open={true} onClose={() => setShowAddModal(false)}>
      <DialogTitle>Add New File</DialogTitle>
      <DialogContent>
        <Box m={2}>
          <TextField
            label="Name"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleFormChange("name", event.target.value);
            }}
            value={formValues.name}
          />
        </Box>
        <Box m={2}>
          <Autocomplete
            options={flattenArray(treeData)
              .filter((item: any) => item.isFolder)
              .map((item: any) => item.name)}
            renderInput={(params) => <TextField {...params} label="Parent" />}
            onChange={(event: any, newValue: string | null) => {
              handleFormChange("parent", newValue);
            }}
          />
        </Box>
        <DialogActions>
          <Button onClick={() => setShowAddModal(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default AddNode;
