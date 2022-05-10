const redux = require('redux')
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

const applyMiddleware = redux.applyMiddleware
const createStore = redux.createStore

const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers
const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED= 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

function cakeOrder(){
    return {
        type: CAKE_ORDERED,
        payload:1,
    }
}

   function cakeRestock (qty = 1){
       return {
           type: CAKE_RESTOCKED,
           payload: qty,
       }
   }
   function icecreamOrder(qty =1){
    return {
        type: ICECREAM_ORDERED,
        payload:qty,
    }
}

function icecreamRestock (qty = 1){
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty,
    }
}

// (prevState,action)=> newState
const initialCakeState= {
    numberOfCakes:10
}
const initialIceCreamState= {
    numberOfIceCream:20
}

const Cakereducer= (state = initialCakeState ,action) => {

    switch(action.type){

        case CAKE_ORDERED:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes - 1,

            }
            case CAKE_RESTOCKED:
                return {
                    ...state,
                    numberOfCakes:state.numberOfCakes + action.payload
                }
            default:
               return state
        }
}
const IceCreamreducer = (state = initialIceCreamState ,action) => {

    switch(action.type){

        case ICECREAM_ORDERED:
            return {
                ...state,
                numberOfIceCream: state.numberOfIceCream - 1,

            }
            case ICECREAM_RESTOCKED:
                return {
                    ...state,
                    numberOfIceCream:state.numberOfIceCream + action.payload
                }
            default:
               return state
        }
}


const RootReducer = combineReducers({
    cake:Cakereducer,
    iceCream:IceCreamreducer
})
const Store = createStore(RootReducer,applyMiddleware(logger))

console.log('Initial State',Store.getState())

// const unsubscribe = Store.subscribe(() => console.log('Update State',Store.getState()))
const unsubscribe = Store.subscribe(() =>{})

const actions = bindActionCreators({ cakeOrder,cakeRestock,icecreamOrder,icecreamRestock},Store.dispatch)
// Store.dispatch(cakeOrder())
// Store.dispatch(cakeOrder())
// Store.dispatch(cakeOrder())
// Store.dispatch(cakeRestock(3))
actions.cakeOrder()
actions.cakeOrder()
actions.cakeOrder()
actions.cakeRestock(3)
actions.icecreamOrder();
actions.icecreamOrder();
actions.icecreamRestock(2)
unsubscribe()