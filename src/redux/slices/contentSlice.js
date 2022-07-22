import { getContent, getPendingContent, getUserContent } from "@lib/content";
import { getUserEditRequests } from "@lib/editrequests";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  content: [],
  limit: 5,
  loading: false,
  empty: false,
  firstVisible: null,
  lastVisible: null,
  searchTerm: "",
  sort: "timestamp",
  order: "desc",
};

export const fetchContentData = createAsyncThunk(
  "content/fetchContent",
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

    const result = res;

    return { result, merge: !!payload?.merge };
  }
);

export const fetchUserContent = createAsyncThunk(
  "content/fetchUserContent",
  async (payload, { getState }) => {
    const {
      profile: {
        profile: { id },
      },
    } = getState();

    const res = await getUserContent({ author: payload?.cid || id });

    const result = res;

    return { result };
  }
);

export const fetchPendingContent = createAsyncThunk(
  "content/fetchPendingContent",
  async (payload, { getState }) => {
    const res = await getPendingContent();
    console.log("in 2");

    const result = res;

    console.log(result);

    return { result };
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
      .addCase(fetchContentData.pending, (state) => {
        state.empty = false;
        state.loading = true;
      })
      .addCase(fetchContentData.fulfilled, (state, action) => {
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
