
import React, { FC } from 'react'
import { Product } from '../../../models/product.model';

import './collectionitem.styles.scss';

const CollectionItem: FC<Product> = ({id, name, price, imageUrl}) => (
    <div className="collection-item">
        <div
        className="image"
        style={{
            backgroundImage: `url(${imageUrl})`
        }}
        />
        <div className="collection-footer">
            <span className="name">{name}</span>
            <span className="price">{price}</span>
        </div>
    </div>
);

export default CollectionItem;