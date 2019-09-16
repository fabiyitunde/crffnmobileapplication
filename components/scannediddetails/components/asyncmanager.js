import { ajax } from "rxjs/ajax";
import { map, catchError, tap, switchMap } from "rxjs/operators";
import { throwError, forkJoin, of } from "rxjs";
import {
  webapibaseurl,
  datacapturewebapibaseurl
} from "../../../constants/global";

export const getIDdetailForScannedCode = (token, updatestatecallback) => {
  updatestatecallback({ isProcessing: true });
  const certificateregisterObsv = rffnos => {
    return ajax
      .getJSON(
        `${datacapturewebapibaseurl}api/certificateregister/getCertificateRegisterByMembershipNumber/${rffnos}`
      )
      .pipe(
        map(res => res),
        catchError(error => of({ error }))
      );
  };
  const individualdataObs = rffnos => {
    return ajax
      .getJSON(
        `${datacapturewebapibaseurl}api/individual/getIndividualDataByMembershipNumber/${rffnos}`
      )
      .pipe(
        map(res => res),
        catchError(error => of({ error }))
      );
  };
  const corporatedataObs = rffnos => {
    return ajax
      .getJSON(
        `${datacapturewebapibaseurl}api/coporate/getCoporateDataByMemebershipId/${rffnos}`
      )
      .pipe(
        map(res => res),
        catchError(error => of({ error }))
      );
  };
  const decryptionobservable = ajax
    .post(`${webapibaseurl}/api/Parameters/getDecryptedToken`, { token: token })
    .pipe(
      map(res => res.response.rffnumber),
      switchMap(rffnos =>
        forkJoin({
          certregdata: certificateregisterObsv(rffnos),
          individualdata: individualdataObs(rffnos),
          corporatedata: corporatedataObs(rffnos)
        })
      ),
      catchError(errval => throwError(errval))
    );
  decryptionobservable.subscribe(res => {
    if (!res.certregdata.error)
      updatestatecallback({ certificateregisterData: res.certregdata });
    if (res.individualdata && !res.individualdata.error)
      updatestatecallback({
        individualData: res.individualdata,
        selectedStep: 2,
        step2Type: "I"
      });
    if (res.corporatedata && !res.corporatedata.error)
      updatestatecallback({
        corporateData: res.corporatedata,
        selectedStep: 2,
        step2Type: "C"
      });
    updatestatecallback({ isProcessing: false });
  });
};
