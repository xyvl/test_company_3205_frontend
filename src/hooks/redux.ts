import { TypedUseSelectorHook, useDispatch, useSelector,  } from "react-redux";
import { AppDispatch, RootSelector } from "../store/store";

export const useCustomDispatch = () => useDispatch<AppDispatch>()
export const useCustomSelector: TypedUseSelectorHook<RootSelector> =  useSelector