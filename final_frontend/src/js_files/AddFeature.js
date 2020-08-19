import React, {Component} from 'react'
import { withRouter } from 'react-router-dom';

import Navbar from './Navbar.js'

class AddFeature extends Component {

  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  api_add_feature(data){
    const endpoint = 'http://127.0.0.1:8000/feature/';
    let thisComponent = this
    let look_up_options = {
         method: "POST",
         body: JSON.stringify(data)
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
         alert('Feature with name \''+responseData['feature_info']['name']+'\' has been created and has id \''+responseData['feature_info']['id']+'\'')
         thisComponent.props.history.push('/feature');
       }
    })

  }

  handleSubmit(event){
    event.preventDefault()
    this.api_add_feature(this.state)
  }

  handleInputChange(event){
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  render()
  {
    return(
      <div className='container'>
      <Navbar/>
      <form className='my-5 mx-2' onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label for='feature_name'>Feature Name</label>
          <input type='text' id='feature_name' name='feature_name' className='form-control' placeholder='Enter Feature Name...' onChange={this.handleInputChange} required='required'/>
        </div>
        <button className='btn btn-primary'>Save</button>
      </form>
      </div>
      )
  }

}

export default withRouter(AddFeature)
