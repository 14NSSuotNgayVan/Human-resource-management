import { all } from "redux-saga/effects";
import { StaffSaga } from "./StaffSaga";
import { CertificateSaga } from "./CertificateSaga";
import { FamilySaga } from "./FamilySaga";
import { ExperienceSaga } from "./ExperienceSage";
import { SalarySaga } from "./SalarySaga";
import { ProcessSaga } from "./ProcessSaga";
export function* RootSaga(){
    yield all([
      StaffSaga(),
      CertificateSaga(),
      FamilySaga(),
      ExperienceSaga(),
      SalarySaga(),
      ProcessSaga(),
      ])
}