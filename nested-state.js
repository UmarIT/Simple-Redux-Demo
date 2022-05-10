const STREET_UPDATED = 'STREET_UPDATED'
const redux = require('redux');
const produce = require('immer').produce
const createStore = redux.createStore
 

function updateStreet(street) {
   return {
       type: STREET_UPDATED,
       payload: street
    }
 }

 const initialState = {
     name:'Umar Abid',
     City:'Lahore',
     address:{
         street:'1324 TED',
         city:"ábC",
         state:'m/a'
     }
 }

 const  reducer = (state= initialState,action) => {

    switch(action.type){

        case STREET_UPDATED:
            // return {
            //     ...state,
            //     address:{
            //         ...state.address,
            //         street: action.payload
            //     },
                
            // }
            return produce(state,(draft) => {
                     draft.address.street= action.payload;
            })

            default:
               return state
    }

 }
 const Store = createStore(reducer)

 console.log('initial State',Store.getState())
   const unsubscribe = Store.subscribe(() => console.log('Update State',Store.getState()))

   Store.dispatch(updateStreet('Arifwala'))
   unsubscribe();
