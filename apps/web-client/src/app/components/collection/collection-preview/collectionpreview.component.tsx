import React, { FC } from 'react';

import './collectionpreview.styles.scss';

import CollectionItem from '../collection-item/collectionitem.component';
import { Product } from '../../../models/product.model';

const CollectionPreview: FC<{title: string, items: Product[]}> =  ({title, items}) => (
    <div className="collection-preview">
        <h1 className="title">{title}</h1>
        <div className="preview">
            {items
            .filter((item, idx) => idx < 4)
            .map((item) => (
                <CollectionItem key={item.id} {...item}/>
            ))}
        </div>
    </div>
)

export default CollectionPreview;

