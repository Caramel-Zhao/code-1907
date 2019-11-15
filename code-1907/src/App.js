import React, { Component } from 'react';
import './App.css';


import { Card, Drawer } from 'antd';

const { Meta } = Card;

let CardWrap = (props) => {
  return (
    <div className="card-wrap">
      <Card
        hoverable
        style={{ width: '100%' }}
        cover={<img className="img" alt="code" src={ props.codeList.img } onClick={ () => props.onClick(props.codeList.img) } />}
      >
        <Meta
          className="text" title={
            <span className={"con"}>
              { props.codeList.name }
              <a className={"link"} target={"_blank"} href={ props.codeList.git }>
                <i className={"iconfont icon-github"} />
              </a>
            </span>
          }
        />
      </Card>
    </div>
  )
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeList: [],
      visible: false,
      placement: 'top',
      checkedImg: ''
    }
  }

  async componentDidMount(){
    let res = await fetch("http://122.51.57.152:3001/api/codelistinfo");
    let data = await res.json();
    this.setState({
      codeList: data
    });
    console.log(data.length)
  }

  showDrawer = (i) => {
    this.setState({
      visible: true,
      checkedImg: i
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {

    return (
      <div>
        <div className="wrap">
          {
            this.state.codeList.map((item,i) => {
              return <CardWrap codeList={ item } onClick={ this.showDrawer } key={i} />
            })
          }
        </div>
        <Drawer
          height="100vw"
          placement={this.state.placement}
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <img
            src={this.state.checkedImg} alt=""
            width="100%"
          />
        </Drawer>
      </div>
    );
  }
}

export default App;
