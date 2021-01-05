import React from 'react';
import PropTypes from "prop-types";

const Error = ({mensaje}) => {
    return (
       <div className="alert alert-primary text-center">
           <p>{mensaje}</p>
       </div>
    );
}
Error.protoType = {
    mensaje: PropTypes.string.isRequired
}

 
export default Error;