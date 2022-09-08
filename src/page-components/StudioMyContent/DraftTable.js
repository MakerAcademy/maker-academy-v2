import GreenButton from "@components/buttons/GreenButton";
import DashboardPaper from "@components/DashboardPaper";
import { useAppSelector } from "@hooks/useRedux";
import { deleteDraft, listenUserDrafts, publishDraft } from "@lib/drafts";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Box, Button, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";

const buildRows = (data, t) => {
  const rows = data?.map?.((item, i) => ({
    id: item.id,
    count: i,
    thumbnail: item.thumbnail,
    contentType: t(item.contentType),
    title: item.title,
    date: moment(item.timestamp?.toDate?.()).format("MMM DD, YY - HH:mm"),
    data: item,
  }));

  return rows || [];
};

const buildColumns = (t) => {
  return [
    //   { field: "id", headerName: "ID", width: 70 },
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
    { field: "title", headerName: t("title"), width: 200 },
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
      width: 450,
      align: "right",
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <GreenButton
            size="small"
            variant="outlined"
            href={`/app/studio/edit/${params.row.contentType}/${params.id}?draft=true`}
            target="_black"
            icon={<EditIcon sx={{ fontSize: 16 }} />}
          >
            {t("edit")}
          </GreenButton>

          <GreenButton
            size="small"
            href={
              params.row.contentType === "course"
                ? `/preview/course/${params.id}?draft=true`
                : `/preview/document/${params.id}?draft=true`
            }
            target="_black"
            icon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
          >
            {t("preview")}
          </GreenButton>

          <Button
            variant="contained"
            size="small"
            onClick={() => publishDraft(params.row?.data)}
            color="info"
            sx={{ height: 38, px: 3, borderRadius: "8px", fontWeight: 600 }}
          >
            {t("publish")}
          </Button>

          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={() => deleteDraft(params.row.data?.id)}
            sx={{ height: 38, px: 3, borderRadius: "8px", fontWeight: 600 }}
          >
            {t("delete")}
          </Button>
        </Stack>
      ),
    },
  ];
};

const DraftTable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState(null);
  const { profile } = useAppSelector((state) => state.profile);

  useEffect(() => {
    if (profile?.id) {
      const unsub = listenUserDrafts(profile?.id, setData);

      return () => unsub();
    }
  }, []);

  const { t } = useTranslation("creator-studio");

  return (
    <DashboardPaper>
      <Typography sx={{ mb: 3 }}>Drafts</Typography>

      <DataGrid
        autoHeight
        rowHeight={70}
        rows={buildRows(data, t)}
        columns={buildColumns(t)}
        pageSize={pageSize}
        onPageSizeChange={(i) => setPageSize(i)}
        rowsPerPageOptions={[5, 10, 20, 50]}
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

export default DraftTable;
