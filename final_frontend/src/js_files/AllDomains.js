import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';

import Navbar from './Navbar.js'

class AllDomains extends Component {

  constructor(props){
    super(props)
    this.state = {
        domains:[{name:'', id:''}],
        done_loading_domains:false
    }
    this.alert_delete_domain = this.alert_delete_domain.bind(this)
    }

  alert_delete_domain(domain_id, domain_name){
  let confirmation = window.confirm('Are you sure you want to delete domain \''+domain_name+'\' having id \''+domain_id+'\'?')
    if (confirmation === true){
      this.api_delete_confirm(domain_id, domain_name)
    }
  }
  
  api_delete_confirm(domain_id, domain_name){
    const endpoint = 'http://127.0.0.1:8000/domain/'+domain_id+'/';
    let thisComponent = this
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
             alert('Domain with name \''+domain_name+'\' and id \''+domain_id+'\' has been deleted.')
             thisComponent.setState(prevState => ({domains:prevState.domains.filter(domain => domain.id!==domain_id)}))
           }
      })

  }

  api_all_domains(){
    let thisComponent = this
    const endpoint = 'http://127.0.0.1:8000/domain/';
    let look_up_options = {
         method: "GET"
    }

    fetch(endpoint, look_up_options)
    .then(function(response){
       return response.json()
    }).then(function(responseData){
      // console.log(responseData.domains_info)
       thisComponent.setState({
         domains:responseData.domains_info,
         done_loading_domains:true
       })
    }).catch(function(error){
       console.log("error", error)
    })

  }

  componentDidMount(){
      this.api_all_domains()
  }
  render(){
    const {domains} = this.state
    const {done_loading_domains} = this.state
    

    if(done_loading_domains===true){
    const domain_list = []
    if (domains.length===0)
    {
      return (
         <div className='container'>
          <Navbar/>
          <br></br><br></br><br></br>
          <button className='btn'><Link className='btn btn-primary' to={{pathname:'/domain/new', state:{fromDashboard:false}}}>Add a new domain</Link></button>
          <hr></hr>
          No Domains available, create a new one!
          
          </div> 
        )
    }
    else{
    for (let domain of domains){
      domain_list.push(

        <div>
        <h4> {domain.name}</h4>
            <div>
          <button className='btn'><Link className='btn btn-primary' to={{pathname:`/domain/${domain.id}`, state:{fromDashboard:false}}}>View Domain</Link></button>
          <button className='btn'><Link className='btn btn-primary' to={{pathname:`/domain/${domain.id}/edit`, state:{fromDashboard:false}}}>Edit Domain</Link></button>
          <button className='btn btn-danger'  onClick={() => this.alert_delete_domain(domain.id, domain.name)}>Delete Domain</button>
      </div>
            <hr></hr>  
      </div>

        )
    }

      return(
      <div className='container'>
      <Navbar/>
      <br></br><br></br><br></br>
      <h1>All Domains</h1>
      <button className='btn'><Link className='btn btn-primary' to={{pathname:'/domain/new', state:{fromDashboard:false}}}>Add a new domain</Link></button>
      <hr></hr>
          {domain_list}
      </div>
      )
    }
  }
  else{
    return (<div className='container'><Navbar/><br></br><h2>Loading...</h2></div>)
  }
}
}

export default withRouter(AllDomains)