import { getContact } from "@lib/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  loading: false,
};

export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async (payload, { getState }) => {
    const {
      user: {
        user: { uid },
      },
    } = getState();

    const userProfile = await getContact(payload?.uid || uid);

    const result = userProfile;

    return { result };
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload.result;
        state.loading = false;
      });
  },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
