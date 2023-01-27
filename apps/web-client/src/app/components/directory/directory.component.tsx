import React from 'react';

import './directory.styles.scss';
import MenuItem from '../menu-item/menu-item.component';
import sections from './directory.data';

class Directory extends React.Component<any, { sections: any[]}> {
  constructor(props: any) {
    super(props);
    this.state = {
      sections
    };
  }

  override render() {
    return (
        <div className="directory-menu">
            {
                this.state.sections.map( ({ id, ...otherSectionProps}) => (
                        <MenuItem key={id} {...otherSectionProps}/>
                    ) 
                )
            }
        </div>
    );
  }

}

export default Directory;
