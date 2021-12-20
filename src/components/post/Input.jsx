import React from "react";

export default function Input({ desc, type, handleChange }) {
    return(
        <input value={desc} type={type} onChange={handleChange} />
    )
}