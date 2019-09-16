import * as firebase from "firebase";
import { LOAD_MEMBERS, LOAD_MEMBERS_INVOICES } from "../actionTypes";

export const loadMembersList = callback => dispatch => {
  firebase
    .database()
    .ref("/members")
    .on("value", snapshot => {
      if (snapshot.val() == null) return;
      var queryrequestlist = [];
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var data = childSnapshot.val();
        queryrequestlist.push(data);
      });
      dispatch({ type: LOAD_MEMBERS, memberslist: queryrequestlist });
      callback();
    });
};

export const loadMemberInvoiceList = (crffnmasterid, callback) => dispatch => {
  const path = `/memberinvoices/${crffnmasterid}`;
  firebase
    .database()
    .ref(path)
    .on("value", snapshot => {
      if (snapshot.val() == null) return;
      var queryrequestlist = [];
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var data = childSnapshot.val();
        queryrequestlist.push(data);
      });
      const data = {
        crffnmasterid: crffnmasterid,
        invoicelist: queryrequestlist
      };
      dispatch({ type: LOAD_MEMBERS_INVOICES, memberinvoicelist: data });
      callback();
    });
};
