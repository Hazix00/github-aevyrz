import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './menu-item.styles.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any

const MenuItem: FC<any> = ({title, imageUrl, size, linkUrl}) => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className={`${size} menu-item`} onClick={() => navigate(`${location.pathname}${linkUrl}`)}>
        <div 
        style={{
            backgroundImage:`url(${imageUrl})`
        }}
        className="background-image"></div>
            <div className="content">
                <h1 className="title">{title.toUpperCase()}</h1>
                <span className="subtitle">SHOP NOW</span>
            </div>
        </div>
    )

}

export default MenuItem;