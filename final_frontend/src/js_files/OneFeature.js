import React, {Component} from 'react'
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

    return (
              <div className='container'><Navbar/> {(done_loading === true) ? <div>
                  {(feature === null) ? 'Page Not Found' : 
                  <div><br></br><br></br><br></br>feature name -> {feature.name} <hr></hr> feature id -> {feature.id} <hr></hr> {feature.domain_id_list.join(', ')}</div>
                  }
                  </div> : <h2><br></br><br></br>Loading...</h2>}</div>
            )
  }

}

export default OneFeature