import GreenButton from "@components/buttons/GreenButton";
import ConfirmationDialog from "@components/ConfirmationDialog";
import DashboardPaper from "@components/DashboardPaper";
import { deleteContent } from "@lib/content";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Box, Button, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";

const DeleteButton = ({ params }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("creator-studio");

  const handleAccept = () => {
    deleteContent(
      params.row.data.id,
      params.row.data.published,
      params.row.data.contentType
    ).then(() => {
      setOpen(true);
    });
  };

  return (
    <>
      <Button
        variant="contained"
        size="small"
        color="error"
        onClick={() => setOpen(true)}
        sx={{ height: 38, px: 3, borderRadius: "8px", fontWeight: 600 }}
      >
        {t("delete")}
      </Button>

      <ConfirmationDialog
        open={open}
        handleAccept={handleAccept}
        handleReject={() => setOpen(false)}
        title={`Delete ${params.row.data.title}`}
        description={`Are you sure you want to delete this ${params.row.data.contentType}?`}
        acceptText="Delete"
        rejectText="No"
        acceptColor="error"
      />
    </>
  );
};

const buildRows = (data, t) => {
  const rows = data?.map?.(({ metadata, ...item }, i) => ({
    id: item.id,
    count: i,
    thumbnail: metadata.thumbnail,
    contentType: t(item.contentType),
    title: metadata.title,
    date: moment(item.timestamp?.toDate?.()).format("MMM DD, YY - HH:mm"),
    data: { ...item, ...metadata },
  }));

  return rows || [];
};

const buildColumns = (t) => {
  return [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "thumbnail",
      headerName: t("thumbnail"),
      width: 140,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <Box sx={{ height: "100%", py: 1 }}>
            <img
              src={params.value}
              alt={params.title}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
          </Box>
        );
      },
    },
    { field: "title", headerName: t("title"), width: 300 },
    {
      field: "date",
      headerName: t("date"),
      // type: "date",
      width: 170,
    },
    {
      field: "contentType",
      headerName: t("type"),
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "",
      width: 400,
      align: "right",
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <GreenButton
            size="small"
            variant="outlined"
            href={`/app/studio/edit/${params.row.contentType}/${params.id}`}
            target="_black"
            icon={<EditIcon sx={{ fontSize: 16 }} />}
          >
            {t("edit")}
          </GreenButton>

          <GreenButton
            size="small"
            href={`/${params.row.contentType}/${params.id}`}
            target="_black"
            icon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
          >
            {t("open")}
          </GreenButton>

          <DeleteButton params={params} />
        </Stack>
      ),
    },
  ];
};

const PublishedContentTable = ({ data }) => {
  const [pageSize, setPageSize] = useState(10);
  const { t } = useTranslation("creator-studio");

  return (
    <DashboardPaper sx={{ minHeight: 600 }}>
      <Typography sx={{ mb: 3 }}>Published Content</Typography>

      <DataGrid
        autoHeight
        rowHeight={70}
        rows={buildRows(data || [], t)}
        columns={buildColumns(t)}
        pageSize={pageSize}
        onPageSizeChange={(i) => setPageSize(i)}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none !important",
            backgroundColor: "red",
          },
          "& .MuiDataGrid-columnHeaders": {
            bgcolor: "grey.grey1",
          },
          "& .MuiDataGrid-columnSeparator": {
            color: "grey.grey1",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            textTransform: "uppercase",
            fontSize: 14,
          },
          "& .MuiDataGrid-cellContent": {
            //   fontSize: 15,
          },
        }}
      />
    </DashboardPaper>
  );
};

export default PublishedContentTable;
