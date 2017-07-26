import React from 'react';
import ReactDOM from 'react-dom';
import Head from './views/head';
import Foot from './views/foot';
import Info from './views/info';
import { Router, Route} from 'react-router';


class ListItemWrapper extends React.Component{
  render(){
    return(
      <li>
        <li>name:{this.props.data.name}</li>
        <li>id:{this.props.data._id}</li>
      </li>
    )
  }
}

class MyComponent extends React.Component{
  render(){
    if(this.props.results){
    return (
      <ul>
        {this.props.results.map(function(result) {
           return <ListItemWrapper key={result._id} data={result}/>;
        })}
      </ul>
    );
    }else{
      return <div></div>
    }
  }
}

class Index extends React.Component {
  constructor(props){
    super(props);
    this.state = {result: null};
  }

  componentWillMount(){
    $.ajax({
      type: "get",
      async:"false",
      url:"/api/userlist",
      // dataType:"jsonp",   // 解决跨域问题方法2,只有跨域时才能用
      success: (result1) => {
        this.setState({
          result: result1
        });
      },
      error:function(){
        alert('fail');
      }
    })
  }

  render(){
    var result = this.state.result;
    console.log(result);
    return (
      <div>
        <h1>注册用户列表</h1>
        <MyComponent results={result} />
      </div>
    );
  }
}


ReactDOM.render(
  <Index />,
  document.getElementById('react-root')
);
