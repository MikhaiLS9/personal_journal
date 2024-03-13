export const INITIAL_STATE = {
  isValid: {
    title: true,
    text: true,
    date: true,
    post: true,
  },

  values: {
    title: "",
    text: "",
    date: "",
    post: "",
  },

  isFormReadytoSub: false,
};

export function formReducer(state, action) {
  switch (action.type) {
    case "RESET_VALIDITY":
      return { ...state, isValid: INITIAL_STATE.isValid };

    case "SUBMIT": {
      const titleValidity = state.values.title?.trim().length;
      const textValidity = state.values.text?.trim().length;
      const postValidity = state.values.post?.trim().length;
      const dateValidity = state.values.date;
      return {
        ...state,
        ...action.payload,
        isValid: {
          title: titleValidity,
          text: textValidity,
          date: dateValidity,
          post: postValidity,
          
        },
        isFormReadytoSub:
          titleValidity && textValidity && dateValidity && postValidity,
      };
      
    }
    case "CLEAR": {
      return { ...state, values: INITIAL_STATE.values };
    }
    case "SET_VALUE": {
      return { ...state, values: { ...state.values, ...action.payload } };
    }

    case "POPULATE_FORM": {

      return {
        ...state,
        values: {
          ...state.values,
          ...action.payload,
        },
      };
    }
    default:
      return state;
  }
}
