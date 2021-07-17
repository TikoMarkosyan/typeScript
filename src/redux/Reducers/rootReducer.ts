import {combineReducers} from "redux";
import { footballReducer } from "./footballReducer";


export const rootReducer = combineReducers({
    data:footballReducer
})

export type RootState = ReturnType<typeof rootReducer>