import React from "react";

const Error = ({error}) => {
    if(!error){
        return <div></div>;
    }
    return(
        <div className="error">
            {error.toString()}
        </div>
    );
}

export default Error;