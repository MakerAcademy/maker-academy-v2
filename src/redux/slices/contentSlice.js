import { getContent } from "@lib/content";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  content: [],
  limit: 1,
  loading: false,
  empty: false,
  firstVisible: null,
  lastVisible: null,
  searchTerm: "",
  sort: "timestamp",
  order: "asc",
};

export const contentFetchData = createAsyncThunk(
  "content/fetchData",
  async (payload, { getState }) => {
    const {
      content: { sort, order, limit, lastVisible },
    } = getState();

    const res = await getContent({
      sort,
      order,
      limit,
      startAfter: payload?.merge ? lastVisible : null,
      ...payload,
    });

    console.log(res);
    const result = res;

    return { result, merge: !!payload?.merge };
  }
);

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setContent: (state, action) => {
      state.content = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setEmpty: (state, action) => {
      state.empty = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setFirstVisible: (state, action) => {
      state.firstVisible = action.payload;
    },
    setLastVisible: (state, action) => {
      state.lastVisible = action.payload;
    },
    reset: (state, action) => {
      state.sort = "timestamp";
      state.order = "asc";
      state.searchTerm = "";
      state.empty = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(contentFetchData.pending, (state) => {
        state.empty = false;
        state.loading = true;
      })
      .addCase(contentFetchData.fulfilled, (state, action) => {
        const result = action.payload.result;
        const merge = action.payload.merge;

        // console.log("Payload", result);

        const _content = !merge ? result : [...state.content, ...result];
        state.content = _content;

        state.firstVisible = _content?.[0];
        state.lastVisible = _content?.[_content.length - 1];

        if (!_content?.length) state.empty = true;

        state.loading = false;
      });
  },
});

export const {
  setContent,
  setLoading,
  setPageSize,
  setEmpty,
  setSearchTerm,
  setSort,
  setOrder,
  setFirstVisible,
  setLastVisible,
} = contentSlice.actions;

export default contentSlice.reducer;
