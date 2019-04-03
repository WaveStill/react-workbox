import React, { Component } from 'react'
import Xgplayer from 'xgplayer-react';

let Player = null;
import sheji from '../../static/sheji.mp4';
import bgp from '../../static/index3.jpg';
import './style.css'

// 用xgplayer-react 测试页面

window.onscroll = function(){
  console.log(document.documentElement.scrollTop);
  if(document.documentElement.scrollTop > 200){
    document.getElementById("mse").classList.add('xgplayer-pip-active');
    document.getElementById("mse").classList.add('bbb');
    document.getElementById("mse").classList.remove('aaa');
    // document.getElementById("mse").style.right=0;
    // document.getElementById("mse").style.bottom=200;
    // document.getElementById("mse").style.left=none;
    // document.getElementById("mse").style.top=none;
  }else{
    document.getElementById("mse").classList.remove('xgplayer-pip-active');
    document.getElementById("mse").classList.add('aaa');
    document.getElementById("mse").classList.remove('bbb');
    // document.getElementById("mse").style.left=0;
    // document.getElementById("mse").style.top=0;
  }
}
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state={
      aaaa:true,
    }
   
  }
  componentDidMount(){
   
    Player.on('pause',()=>{
      console.log("11111111")
      //Player.getPIP()
    });
  }


  getPIPcl = ()=>{
    console.log(Player)
    Player.on('volumechange',function(){
      console.log("11111111")
      Player.getPIP()
      //事件名称可以在上述查询
    });
    Player.on('pause',()=>{
      Player.getPIP()
      console.log("11111111")
    });

    this.setState({
      aaaa:true,
    })
  }

  render() {
    let config = {
      id: 'mse',
      url: sheji,
      width: 600,
      height: 337.5,
      poster: bgp,
      playbackRate: [0.5, 0.75, 1, 1.5, 2],
      thumbnail: {
        pic_num: 44,
        width: 160,
        height: 90,
        col: 10,
        row: 10,
        urls: [bgp,bgp],
      },
      download: true ,
      pip: this.state.aaaa,
      getPIP:function(player){return true},
      danmu: {
        comments: [  //弹幕数组
          {
            duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
            id: '1', //弹幕id，需唯一
            start: 3000, //弹幕出现时间，毫秒
            prior: true, //该条弹幕优先显示，默认false
            color: true, //该条弹幕为彩色弹幕，默认false
            txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
            style: {  //弹幕自定义样式
              color: '#ff9500',
              fontSize: '20px',
              border: 'solid 1px #ff9500',
              borderRadius: '50px',
              padding: '5px 11px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            },
            mode: 'top' //显示模式，top顶部居中，bottom底部居中，scroll滚动，默认为scroll
            // el: DOM //直接传入一个自定义的DOM元素作为弹幕，使用该项的话会忽略所提供的txt和style
          }
        ],
        area: {  //弹幕显示区域
          start: 0, //区域顶部到播放器顶部所占播放器高度的比例
          end: 1 //区域底部到播放器顶部所占播放器高度的比例
        },
        closeDefaultBtn: false, //开启此项后不使用默认提供的弹幕开关，默认使用西瓜播放器提供的开关
        defaultOff: false //开启此项后弹幕不会初始化，默认初始化弹幕
      }
    };
    
    //let Player = new Xgplayer(); 
   console.log(Player)
   
    return (
      <div>
        <h2>这个是 Home 页面 !</h2>
        <input maxLength={2} />
        <input maxLength={4} />
        <Xgplayer config={config} playerInit={(player)=>{ Player = player }} pause={this.getPIPcl} />
        <div style={{height:"2000"}} onClick={this.getPIPcl}>占位div</div>
      </div>
    )
  }
}
