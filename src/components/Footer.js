import React from 'react';
import { Link } from 'react-router-dom';
import githubIcon from '../assets/github-icon.svg';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <Link className='footer__link' to={'https://github.com/tyradire'} target="_blank">
        <img className='footer__link-icon' href={githubIcon} />
      </Link>
    </div>
  );
};

export default Footer;