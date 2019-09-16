import { LOAD_MEMBERS, LOAD_MEMBERS_INVOICES } from "../actionTypes";

const initialState = {
  memberslist: [],
  membersinvoicelist: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_MEMBERS:
      return {
        ...state,
        memberslist: action.memberslist
      };
    case LOAD_MEMBERS_INVOICES:
      var copyoflist = [...state.membersinvoicelist];
      var existingrec = copyoflist.find(
        a => a.crffnmasterid == action.memberinvoicelist.crffnmasterid
      );
      if (existingrec == null) {
        copyoflist.push(action.memberinvoicelist);
      } else {
        const index = copyoflist.indexOf(existingrec);
        copyoflist[index] = action.memberinvoicelist;
      }
      return {
        ...state,
        membersinvoicelist: copyoflist
      };
    default:
      return state;
  }
}
