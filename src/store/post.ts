import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { store } from "./store";

let controller: any;
const newTokent = async () => {
  controller = await new AbortController();
};
newTokent();
export const getPost = createAsyncThunk(
  "post/getPost",
  async (props: IInitialState, { rejectWithValue, dispatch }) => {
    if (props.state === "") {
      try {
        const data: any = await axios.post(
          `${process.env.REACT_APP_URL_SERVER}/api/get_user`,
          props.post,
          { signal: controller.signal }
        );
        return data.data;
      } catch (e: any) {
        return rejectWithValue(e.response.data);
      }
    } else if (props.state === "loading") {
      await controller.abort();
      await newTokent();
      try {
        const data: any = await axios.post(
          `${process.env.REACT_APP_URL_SERVER}/api/get_user`,
          props.post,
          { signal: controller.signal }
        );
        return data.data;
      } catch (e: any) {
        return rejectWithValue(e.response.data);
      }
    } else {
      try {
        const data: any = await axios.post(
          `${process.env.REACT_APP_URL_SERVER}/api/get_user`,
          props.post,
          { signal: controller.signal }
        );
        return data.data;
      } catch (e: any) {
        return rejectWithValue(e.response.data);
      }
    }
  }
);

interface IPost {
  email: string;
  number: string;
}

interface IInitialState {
  state: "loading" | "finish" | "rejected" | "";
  result: string;
  post: IPost;
}

const initialState: IInitialState = {
  state: "",
  result: "",
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
        state.result = action.payload;
      })
      .addCase(getPost.rejected, (state, action) => {
        if (!action.payload) {
          state.state = "loading";
        } else {
          state.result = action.payload as string;
          state.state = "rejected";
        }
      });
  },
});
export default post.reducer;