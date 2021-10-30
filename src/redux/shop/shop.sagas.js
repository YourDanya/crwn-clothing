import {takeLatest, call, put, all} from 'redux-saga/effects'

import ShopActionTypes from "./shop.types";
import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.utils";
import {fetchCollectionFailure, fetchCollectionsSuccess} from "./shop.actions";

const func1= ()=> new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(10)
    }, 3000)
})

const func2= (temp)=>{
    console.log('inside function 2')
    return temp
}

export function* fetchCollectionsAsync(){
    // const res1 = yield func1()
    // const res2= func2(res1)
    try{
        const collectionRef= firestore.collection('collections')
        const snapshot= yield collectionRef.get()
        const collectionsMap= yield call(convertCollectionsSnapshotToMap,snapshot)
        yield put(fetchCollectionsSuccess(collectionsMap))
    }catch(error){
        yield put(fetchCollectionFailure(error.message))
    }
}

export function* fetchCollectionsStart() {
   yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}

export function* shopSagas(){
    yield all([call(fetchCollectionsStart)])
}