import { all } from "redux-saga/effects";
import { StaffSaga } from "./StaffSaga";
import { CertificateSaga } from "./CertificateSaga";
export function* RootSaga(){
    yield all([
      StaffSaga(),
      CertificateSaga(),
      ])
}