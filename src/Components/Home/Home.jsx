import React from 'react'
import { Link } from 'react-router-dom'
import hero from '../../assets/hero.png'
import './home.css'
import { EdubukConAdd } from './../../Context/constant';
const Home = () => {
  return (
    <div className='home-container'>
    <div className='col-1'>
    <img src={hero} alt="hero"></img>
    </div>
    <div className='col-2'>
      <h1>INTRODUCING</h1>
      <h1 id='edubuk'>EDUBUK</h1>
      <div className='about'>
        <p>Digitally Record & Verify Educational Transcripts and Work-Experience Certificates on Blockchain making Background Verification Process Significantly Cheaper & Faster</p>
      </div>
      <div className='btnIssue'>
      <Link to="/issuer" className="button">Issue A Credential</Link>
      </div>
    </div>

    </div>
  )
}

export default Home