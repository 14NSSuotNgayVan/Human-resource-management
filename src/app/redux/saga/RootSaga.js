import { all } from "redux-saga/effects";
import { StaffSaga } from "./StaffSaga";
import { CertificateSaga } from "./CertificateSaga";
import { FamilySaga } from "./FamilySaga";
import { ExperienceSaga } from "./ExperienceSage";
export function* RootSaga(){
    yield all([
      StaffSaga(),
      CertificateSaga(),
      FamilySaga(),
      ExperienceSaga()
      ])
}