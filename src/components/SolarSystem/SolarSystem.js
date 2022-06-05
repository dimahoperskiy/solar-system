import React, {useEffect} from 'react';
import {init} from "./three";

const SolarSystem = () => {
    useEffect(() => {
        init()
    })

    return (
        <canvas className="solar"/>
    );
};

export default SolarSystem;