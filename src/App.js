import React, { Component, useContext } from 'react';
import axios from 'axios';
import './App.css';
// import DocParser from './DocParser';

const { Provider, Consumer } = React.createContext({
  checking: false,
  lists: false
});

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      checking: false,
      lists: false
    }
  }

  w3c_check = () => {

    if (document.getElementById("w3c_area").value) {

      this.setState({
        checking: true
      });

      const check_list = document.getElementById("w3c_area").value.split("\n");

      // document.getElementById("w3c_result").innerHTML = "";

      let i = 0;

      const recycle = (num) => {
        if (i < check_list.length) {
          
          let encode_check_list = check_list[num];

          if(check_list[num].indexOf('http') === -1){
            encode_check_list = 'https://'+check_list[num];
          }

          this.setState({
            lists: {
              ...this.state.lists,
              [i]: {
                url : encode_check_list,
                html: {
                  errors: false
                },
                css: {
                  errors: false
                }
              }
            }
          });

          axios.get(`https://validator.w3.org/nu/?doc=${encodeURIComponent(encode_check_list)}&out=json`)
          .then(result => {
            if(result.data.messages){
              result.data.messages.filter((obj, index) => {
                if(obj.type === "error") {
                  this.setState({
                    lists: {
                      ...this.state.lists,
                      [i]: {
                        ...this.state.lists[i],
                        html: {
                          ...this.state.lists[i].html,
                          errors: {
                            ...this.state.lists[i].html.errors,
                            [index]: {
                              line: obj.lastLine,
                              extract: obj.extract,
                              message: obj.message
                            }
                          }
                        }
                      }
                    }
                  });
                }
              });
              
              console.log("HTML CHECK OK");

              css_check(num);
            }
          })
          .catch(err => {
            console.log(err);

            css_check(num);
          });
            
        } else {
          console.log("End W3C Checked");
          this.setState({
            checking: false
          });
        }
      }

      const css_check = (num) => {

        let encode_check_list = check_list[num];
          
        if(check_list[num].indexOf('http') === -1){
          encode_check_list = 'https://'+check_list[num];
        }

        axios.get(`https://jigsaw.w3.org/css-validator/validator?uri=${encodeURIComponent(encode_check_list)}&profile=css3svg&output=json`)
          .then(result => {
            if (result) {
              this.setState({
                lists: {
                  ...this.state.lists,
                  [i]: {
                    ...this.state.lists[i],
                    css: {
                      ...this.state.lists[i].css,
                      errors: result.data.cssvalidation.errors ? result.data.cssvalidation.errors : false
                      
                    }
                  }
                }
              })
            }

            console.log("CSS CHECK OK");

            i++;
            recycle(i);
          })
          .catch(err => {
            console.log(err);

            i++;
            recycle(i);
          });
      }

      recycle(0);
    } else {
      alert("URL을 작성하세요");
      document.getElementById("w3c_area").focus();
    }
  }

  render() {
    return (
      <div className="app">
        {/* <a id="hi098123btn" onClick={() => DocParser('hwp')}>한글(.hwp) 다운로드</a> */}
        {/* <button id="hi098123btn" onClick={() => DocParser('doc', 121)}>리스트 다운로드</button> */}
        
      </div>
    );
  }
}

export default App;
