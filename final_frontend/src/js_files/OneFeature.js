import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import Navbar from './Navbar.js'

class OneFeature extends Component{

  constructor(props){
    super(props)
    this.state={
      id: null,
      feature: null,
      done_loading: false
    }
    // this.api_view_feature  = this.api_view_feature.bind(this)
  }

  componentDidMount(){
    this.setState({
        id: null,
        feature: null
      })
    if (this.props.match){
      const {id} = this.props.match.params
      this.setState({
        id: id,
        done_loading: false
      })
      this.api_view_feature(id)
    }
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
             thisComponent.props.history.push('/feature');
           }
      })

  }

   api_view_feature(feature){
    const view_endpoint = 'http://127.0.0.1:8000/feature/'+feature+'/'
    let thisComponent = this
    let view_look_up_options = {
          method: 'GET',
          headers: {
             'content-type': 'application/json'
      }
      }
        fetch(view_endpoint, view_look_up_options)
        .then(function(response){
           return response.json()
        }).then(function(responseData){
           // console.log(responseData)
           thisComponent.setState({
               done_loading: true,
               feature:responseData.feature_info
           })
        })
  }

  render(){
    const {id} = this.state
    const {done_loading} = this.state
    const {feature} = this.state
    const domain_list = []

    if (done_loading===true){

    if (feature.domain_id_list.length===0){
        domain_list.push(
          <div>No domains have '{feature.name}' associated to it.</div>)
    }
    else{
      for (let domain of (feature.domain_id_list)){
        domain_list.push(
          <div>
            {domain.name}
          </div>
        )
      }
    }
    }

    return (
              <div className='container'><Navbar/> {(done_loading === true) ? <div>
                  {(feature === null) ? 'Page Not Found' :
                  <div> 
                  <div><br></br><br></br><br></br>feature name -> {feature.name} <hr></hr> feature id -> {feature.id} <hr></hr>{domain_list}<br></br></div>
                  <button className='btn'><Link className='btn btn-primary' to={{pathname:`/feature/${feature.id}/edit`, state:{fromDashboard:false}}}>Edit Name</Link></button>
                  <button className='btn btn-danger'  onClick={() => this.alert_delete_feature(feature.id, feature.name)}>Delete Feature</button>
                  </div>
                  }
                  </div> : <h2><br></br><br></br>Loading...</h2>}</div>
            )
  }

}

export default OneFeature