import React from 'react'
import './collection.styles.scss'

import CollectionItem from "../../components/collection-item/collection-item.component";
import {connect} from 'react-redux'
import {selectCollection} from "../../redux/shop/shop.selectors";

const CollectionPage= ({collection})=> {
    const {title, items}= collection;
    console.log(collection);
    return <div className={'collection-page'}>
        <h2 className={'title'}>{title}</h2>
        <div className={'items'}>
            {
                items.map(item => <CollectionItem key={item.id} item={item}/>)
            }
        </div>
    </div>
}


const mapStateToProps = (state, ownProps) => {
    return {collection: selectCollection(ownProps.match.params.collectionId)(state)}
}

export default connect(mapStateToProps)(CollectionPage)