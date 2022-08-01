import GreenButton from "@components/buttons/GreenButton";
import DashboardPaper from "@components/DashboardPaper";
import { useAppDispatch } from "@hooks/useRedux";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Box, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fetchUserContent } from "@redux/slices/contentSlice";
import moment from "moment";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";

const buildRows = (data, t) => {
  return data?.map?.((item, i) => ({
    id: item.id,
    count: i,
    thumbnail: item.thumbnail,
    contentType: t(item.contentType),
    title: item.title,
    date: moment(item.timestamp?.toDate?.()).format("MMM DD, YY - HH:mm"),
    visibility: item.status,
    views: item.views,
    likes: item?.likes?.length || 0,
  }));
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
      field: "visibility",
      headerName: t("visibility"),
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "views",
      headerName: t("views"),
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "likes",
      headerName: t("likes"),
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "",
      width: 200,
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
            href={
              params.row.contentType === "courses"
                ? `/course/${params.id}`
                : `/document/${params.id}`
            }
            target="_black"
            icon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
          >
            {t("open")}
          </GreenButton>
        </Stack>
      ),
    },
  ];
};

const ContentTable = () => {
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserContent())
      .then(({ payload }) => setData(payload?.result))
      .then(() => setLoading(false));
  }, []);

  const { t } = useTranslation("creator-studio");

  return (
    <DashboardPaper sx={{ minHeight: 400 }}>
      <Typography sx={{ mb: 3 }}>My Content</Typography>

      {!loading && (
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
              bgcolor: "primary.grey1",
            },
            "& .MuiDataGrid-columnSeparator": {
              color: "primary.grey1",
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
      )}
    </DashboardPaper>
  );
};

export default ContentTable;
