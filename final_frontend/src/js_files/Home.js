import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import '../css_files/Home.css'

class Home extends Component {
  
  handleAllDomains(){
    // window.location.assign('/domain')
  }

  handleAllFeatures(){
    // window.location.assign('/feature')
  }

  render(){
  	return (
  		<div className="row no-gutters">
          
              <section className="col-md-6 no-gutters" onClick={this.handleAllDomains} style={{cursor: 'pointer'}}>              
                <div className="leftside d-flex justify-content-center align-items-center" style={{backgroundImage: "url(https://i.pinimg.com/originals/92/2b/8a/922b8afdbf2a8aa799377b155bd91874.jpg)"}}>
                  <p className="serif"><Link to={{pathname:'/domain', state:{fromDashboard:false}}}>Domains</Link></p>                                                                                                                                    
                </div>              
              </section>

              <section className="col-md-6 no-gutters" onClick={this.handleAllFeatures} style={{cursor: 'pointer'}}>              
                <div className="rightside d-flex justify-content-center align-items-center" style={{backgroundImage: "url(https://i.pinimg.com/originals/1a/cc/af/1accaf88c4ce3d0fd89a7cde0e960653.jpg)"}}>
                  <p className="serif"><Link to={{pathname:'/feature', state:{fromDashboard:false}}}>Features</Link></p>
                </div>
              </section>

      </div>
  		)
  }
}

export default Home
