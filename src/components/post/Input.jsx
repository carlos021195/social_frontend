import React from "react";

export default function Input({ desc, type, handleChange }) {
    return(
        <input data-testid="inputTest" value={desc} type={type} onChange={handleChange} />
    )
}