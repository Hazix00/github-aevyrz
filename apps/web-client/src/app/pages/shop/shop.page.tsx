/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import './shop.styles.scss'

import SHOP_DATA from './shop.data'
import CollectionPreview from '../../components/collection/collection-preview/collectionpreview.component';
import { ProductsCollection } from '../../models/productsCollection.model';

interface IState {
  collections?: ProductsCollection[];
}

class ShopPage extends React.Component<any, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      collections: SHOP_DATA
    };
  }

  override render() {
    return (
      <div>
        {this.state?.collections?.map((collection: ProductsCollection) => (
          <CollectionPreview key={collection.id} {...collection}/>
        ))}
      </div>
    );
  }

}

export default ShopPage;
