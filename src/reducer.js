const initialState = {
  cafes: [],
  query: ''
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_QUERY":
      return Object.assign({}, state, {
        query: action.query
    })
    default:

  }
}

export default rootReducer;
