import { combineReducers } from "@reduxjs/toolkit";
import { manageServiceReducer } from "./serviceManager/slice";
import { manageTherapistReducer } from "./therapistManager/slice";
import { manageShiftReducer } from "./shiftManager/slice";
import { manageSlotReducer } from "./slotManager/slice";
import { manageTransactionReducer } from "./transactionManager/slice";
import { manageAppointmentReducer } from "./appointmentManager/slice";

export const rootReducer = combineReducers({
  manageService: manageServiceReducer,
  manageTherapist: manageTherapistReducer,
  manageShift: manageShiftReducer,
  manageSlot: manageSlotReducer,
  manageTransaction: manageTransactionReducer,
  manageAppointment: manageAppointmentReducer,
});
