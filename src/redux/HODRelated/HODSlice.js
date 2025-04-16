import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    HODList: [],
    loading: false,
    error: null,
    response: null,
    statestatus: "idle",
};

const HODSlice = createSlice({
    name: 'HOD',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        stuffDone: (state) => {
            state.loading = false;
            state.error = null;
            state.response = null;
            state.statestatus = "added";
        },
        getSuccess: (state, action) => {
            state.HODList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        underHODControl: (state) => {
            state.loading = false;
            state.response = null;
            state.error = null;
            state.statestatus = "idle";
        }
    },
});

export const {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    underHODControl,
    stuffDone,
} = HODSlice.actions;

export const HODReducer = HODSlice.reducer;