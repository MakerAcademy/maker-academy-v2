import { getContent, getPendingContent, getUserContent } from "@lib/content";
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
  order: "desc",
  reachedLast: false,
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

    const result = res;

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
      state.order = "desc";
      state.searchTerm = "";
      state.empty = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContentData.pending, (state) => {
        state.empty = false;
        state.reachedLast = false;
        state.loading = true;
      })
      .addCase(fetchContentData.fulfilled, (state, action) => {
        const result = action.payload.result;
        const merge = action.payload.merge;

        const _content = !merge ? result : [...state.content, ...result];
        state.content = _content;

        state.firstVisible = _content?.[0];
        state.lastVisible = _content?.[_content?.length - 1];

        if (!_content?.length) state.empty = true;
        if (!result?.length) state.reachedLast = true;

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
