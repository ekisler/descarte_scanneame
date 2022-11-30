const initialState = {
  car: [],
  user: [],
  allCars: [],
  allUsers: [],
  carDetail: [],
  DataUser: [],
  EmailUser: [],
  D_user: [],
  loading: false,
  transactions: [],
  payment_link: [],
  consult: [],
  ratingUser: [],
  favorite: []
};
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_CARS":
      return {
        ...state,
        allCars: action.payload,
        car: action.payload,
        loading: false,
      };

    case "GET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "GET_USERS":
      return {
        ...state,
        allUsers: action.payload,
      };
    case "GET_CAR_DETAIL":
      return {
        ...state,
        carDetail: action.payload,
        loading: false,
      };
    case "GET_CAR_FOR_NAME":
      return {
        ...state,
        car: action.payload,
      };
    case "GET_CAR_FOR_CONDITION":
      return {
        ...state,
        car: filtrarcars(action.payload, state.car)
      };
    case "ORDER_FOR_PRICE":
      return {
        ...state,
        car: filtrarcars(action.payload, state.car),
      };
    case "FILTER_FOR_MODEL":
      console.log(action.payload)
      return {
        ...state,
        car: filtrarcars(action.payload, state.car),
      };
    case "FILTER_FOR_BRAND":
      return {
        ...state,
        car: filtrarcars(action.payload, state.car),
      };
    case "LOADING":
      return {
        ...state,
        loading: true,
      }
    case "GET_TRANSACTIONS":
      return {
        ...state,
        transactions: action.payload
      }
    case "GET_PAYMENT_LINK":
      return {
        ...state,
        payment_link: action.payload
      }
    case "INFO_USER":
      return {
        ...state,
        DataUser: action.payload,
      }
    case "INFO_USER_EMAIL":
      return {
        ...state,
        D_user: action.payload,
      }
    case "POST_CAR":
      return {
        ...state,
      }
    case "GET_CONSULTS":
      return {
        ...state,
        consult: action.payload,
      }
    case "POST_CONSULTS":
      return {
        ...state,
      }
    case "EMAIL_USER":
      return {
        ...state,
        emailUser: [action.payload],
      }
    case "RATING_USER":
      return {
        ...state,
        ratingUser: [action.payload],
        loading: false,
      }
      case "POST_FAVORITES":
        return{
          ...state
        }
      case "GET_FAVORITES":
        return {
          ...state,
          favorite: action.payload,
        }
      case "POST_RESPONSE":
        return{
          ...state
        }
        case "DELETE_FAVORITE":
          return {
            ...state, 
          }
    default:
      return state;
  }
};
function filtrarcars(carsfiltered, carsactual) {
  let car = carsactual
  let carprice = carsfiltered
  let carros = []
  for (let i = 0; i < carprice.length; i++) {
    for (let j = 0; j < car.length; j++) {
      if (carprice[i].id == car[j].id) {
        carros.push(carprice[i])
      }
    }
  }
  if (carros.length == 0) {
    return ["none"];
  }
  return carros;
}