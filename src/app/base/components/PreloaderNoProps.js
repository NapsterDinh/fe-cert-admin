
import React from 'react';
import { Image } from '@themesberg/react-bootstrap';

import ReactLogo from "../assets/img/technologies/react-logo-transparent.svg";

const PreloaderNoProps = () => (
    <>
    <div className={`preloader bg-soft flex-column justify-content-center align-items-center`}>
      <Image className="loader-element animate__animated animate__jackInTheBox" src={ReactLogo} height={40} />
    </div>
    </>
)
 
export default PreloaderNoProps;
