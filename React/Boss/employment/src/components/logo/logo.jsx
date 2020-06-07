import React, { Component } from 'react'
import logo from './pin.jpg'
import './logo.css'
export default class Logo extends Component {
  render() {
    return (
      <div className='logo-container'>
        <img src={logo} alt='boss' className='logo-img'></img>
      </div>
    )
  }
}
