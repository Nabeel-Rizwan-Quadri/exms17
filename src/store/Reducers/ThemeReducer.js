const initialState = { theme: "white" };

export default function CounterReducer(state = initialState, action) {
  switch (action.type) {
    case "darkmode":
      return { ...state, theme: action.payload };
    case "lightmode":
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}
