import React, { Component } from 'react';
import './About.css';

class About extends Component {
    render() {
      return (
        <div className="About">
          <h3>react-cognito</h3>
          <ul>
            <li>
              version: 0.1.0
            </li>
            <li>
              author email: <a href="mailto: dmarti21@gmail.com">dmarti21@gmail.com</a>
            </li>
            <li>
              license: MIT
            </li>
          </ul>
        </div>
    )
  }
}

export default About;
