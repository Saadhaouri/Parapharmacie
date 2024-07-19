import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useState } from "react";

interface DataTableProps {
  data: any[];
  columns: any[];
  onDelete?: (row: any) => void;
  onUpdate?: (row: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  onDelete,
  onUpdate,
}) => {
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    // Do something when the row selection changes

    setRowSelection;
  }, [rowSelection]);

  const handleDelete = (row: any) => {
    if (onDelete) {
      onDelete(row);
    }
  };

  const handleUpdate = (row: any) => {
    if (onUpdate) {
      onUpdate(row);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnOrdering: true,
    defaultDisplayColumn: { enableResizing: true },
    enableRowSelection: true,
    enablePagination: true, // Enable pagination
    // onPageChange: (page) => console.log(page), // Optional: Handle page change event

    muiTableContainerProps: { sx: { maxHeight: "500px", background: "green" } },
    rowVirtualizerOptions: { overscan: 5 },
    columnVirtualizerOptions: { overscan: 2 },
    enableRowActions: true, // Enable row actions
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
        <IconButton color="secondary" onClick={() => handleUpdate(row)}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={() => handleDelete(row)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default DataTable;
