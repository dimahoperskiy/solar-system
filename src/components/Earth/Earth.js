import React, {useEffect} from 'react';
import {init} from "./three";
import "./Earth.css"

const Earth = () => {
    useEffect(() => {
        init()
    }, [])

    return (
        <canvas className="canvas"/>
    );
};

export default Earth;