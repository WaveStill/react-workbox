import React, { Component } from 'react'
import Player from 'xgplayer';

import sheji from '../../static/sheji.mp4'
import bgp from '../../static/index3.jpg';

// 测试用 xglpayer 原生在react里面 使用


export default class Page1 extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      current:1
    }
    // let div1 = document.getElementById("div1");
    // console.log(div1);
  }

  componentDidMount(){
    this.setState({
      current:this.state.current +3
    })
    //let div1 = document.getElementById("div1");
    //console.log(div1);
    let player = new Player({
      id: 'div1',
      url: sheji,
      width: 600,
      height: 337.5,
      poster: bgp,
      download: true ,
      pip: true,
    });
    player.on('pause',()=>{
      player.getPIP()
      console.log("11111111")
    });

  }
  
  render() {
    const { current } = this.state;
    console.log(current);
    console.log('再更新');
    return (
      <div>
        <h3>这个是 page 页面</h3>
        <div id="div1"></div>
      </div>
    )
  }
}
