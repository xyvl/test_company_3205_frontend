import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPost = createAsyncThunk("post/getPost", async () => {
  const data: IPost = { email: "ddddd", number: "fff" } ;
  return data
});

interface IPost {
    email: string;
    number: string;
}

interface IInitialState {
  state: "loading" | "finish" | "rejected" | "";
  post: IPost
}

const initialState: IInitialState = {
  state: "",
  post: {
    email: "",
    number: "",
  },
};

const post = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPost.pending, (state) => {
        state.state = "loading";
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.state = "finish";
        state.post = action.payload;
      })
      .addCase(getPost.rejected, (state) => {
        state.state = "rejected";
      });
  },
});
export default post.reducer;