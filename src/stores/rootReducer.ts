import { combineReducers } from "@reduxjs/toolkit";
import { manageServiceReducer } from "./serviceManager/slice";
import { manageTherapistReducer } from "./therapistManager/slice";
import { manageShiftReducer } from "./shiftManager/slice";
import { manageSlotReducer } from "./slotManager/slice";

export const rootReducer = combineReducers({
  manageService: manageServiceReducer,
  manageTherapist: manageTherapistReducer,
  manageShift: manageShiftReducer,
  manageSlot: manageSlotReducer,
});
