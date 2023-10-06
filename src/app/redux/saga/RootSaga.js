import { all } from "redux-saga/effects";
import { StaffSaga } from "./StaffSaga";
import { AddressSaga } from "./AddressSaga";

export function* RootSaga(){
    yield all([
      StaffSaga(),
      AddressSaga()
      ])
}