import React, { FC } from "react";

import './form-input.styles.scss';

const FormInput: FC<any>= ({handleChange, label, ...otherProps}) => (
    <div className="group">
        <input className="form-input" {...otherProps} onChange={handleChange} required/>
        {
            label && (
                <label className={`${otherProps.value.length ? `shrink`: ``} form-input-label`}>{label}</label>
            )
        }
    </div>
);

export default FormInput;