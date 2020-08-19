import React, {Component} from 'react'
import Navbar from './Navbar.js'

class OneDomain extends Component{

  constructor(props){
    super(props)
    this.state={
      id: null,
      domain: null,
      done_loading: false
    }
  }

	componentDidMount(){
    this.setState({
        id: null,
        domain: null
      })
    if (this.props.match){
      const {id} = this.props.match.params
      this.setState({
        id: id,
        done_loading: false
      })
      this.api_view_domain(id)
    }
  }

   api_view_domain(domain){
    const view_endpoint = 'http://127.0.0.1:8000/domain/'+domain+'/'
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
               domain:responseData.domain_info
           })
        })
  }

	render(){
		const {id} = this.state
    const {done_loading} = this.state
    const {domain} = this.state

    return (
              <div className='container'><Navbar/> {(done_loading === true) ? <div>
                  {(domain === null) ? 'Page Not Found' : 
                  <div><br></br><br></br><br></br>domain name -> {domain.name} <hr></hr> domain id -> {domain.id} <hr></hr> {domain.feature_id_list.join(', ')}</div>
                  }
                  </div> : <h2><br></br><br></br>Loading...</h2>}</div>
            )
  }

}

export default OneDomain