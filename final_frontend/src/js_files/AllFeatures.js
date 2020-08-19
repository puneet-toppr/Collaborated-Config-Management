import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router-dom';

import Navbar from './Navbar.js'

class AllFeatures extends Component {
	constructor(props){
    super(props)
    this.state = {
        features:[{name:'', id:''}],
    }
    this.alert_delete_feature = this.alert_delete_feature.bind(this)
  }

  alert_delete_feature(feature_id, feature_name){
    let confirmation = window.confirm('Are you sure you want to delete feature \''+feature_name+'\' having id \''+feature_id+'\'?')
    if (confirmation === true){
      this.api_delete_confirm(feature_id, feature_name)
    }
  }
  
  api_delete_confirm(feature_id, feature_name){
    const endpoint = 'http://127.0.0.1:8000/feature/'+feature_id+'/';
    let thisComponent=this
    let look_up_options = {
         method: "DELETE",
         headers: {
             'content-type': 'application/json'
      }
      }
      fetch(endpoint, look_up_options)
      .then(function(response){
         return response.json()
      }).then(function(responseData){
         console.log(responseData)
              if (responseData['error_message']){
             alert(responseData['error_message'])
           }
           else{
             alert('Feature with name \''+feature_name+'\' and id \''+feature_id+'\' has been deleted.')
             thisComponent.componentDidMount()
           }
      })

  }

  api_all_features(){
  	let thisComponent = this
    const endpoint = 'http://127.0.0.1:8000/feature/';
    let look_up_options = {
         method: "GET"
    }

    fetch(endpoint, look_up_options)
    .then(function(response){
       return response.json()
    }).then(function(responseData){
       console.log(responseData)
       console.log(responseData.features_info)
       thisComponent.setState({
       	features:responseData.features_info
       })
    }).catch(function(error){
       console.log("error", error)
    })

  }

  componentDidMount(){
      this.api_all_features()
  }
  render(){
  	const {features} = this.state
    
    const feature_list = []

    for (let feature of features){
      feature_list.push(

        <div>
        <h1> {feature.name}</h1>
        <p> {feature.id}</p>
            <div>
          <button className='btn'><Link className='btn btn-primary' to={{pathname:`/feature/${feature.id}`, state:{fromDashboard:false}}}>View Feature</Link></button>
          <button className='btn btn-danger'  onClick={() => this.alert_delete_feature(feature.id, feature.name)}>Delete Feature</button>
      </div>
            <hr></hr>  
      </div>

        )
    }

    return(
    <div className='container'>
    <Navbar/>
    <br></br><br></br><br></br>
    <p>this is listing all features</p>
    <button className='btn'><Link className='btn btn-primary' to={{pathname:'/feature/new', state:{fromDashboard:false}}}>Add a new feature</Link></button>
    <hr></hr>
        {feature_list}
    </div>
    )
  }
}

export default withRouter(AllFeatures)
