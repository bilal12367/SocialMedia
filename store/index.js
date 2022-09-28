const { createSlice, configureStore } = require("@reduxjs/toolkit");


const slice = createSlice({
    name: 'AppSlice',
    initialState: {
        testVar: 'Old Data',
    },
    reducers: {
        setTestVariable(state,action) {
            state.testVar = action.payload.var;
        }
    }
})

export const actions = slice.actions;

const store = configureStore({
    reducer: slice.reducer
})

export default store;