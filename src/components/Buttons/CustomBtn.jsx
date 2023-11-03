import React from 'react'
import "./CustomBtnStyle.css";

export const CustomBtn = (props) => {
    const styles = props.logo ? { "backgroundImage": 'url(' + props.logo + ')' } : false

    return (
        <>
        <a style={styles} className="customBtnStyle">
            <span>{props.text}</span>
        </a>
        </>
    )
}

export default CustomBtn
