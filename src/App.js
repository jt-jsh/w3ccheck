import React from 'react';
import axios from 'axios';
import './App.css';
// import DocParser from './DocParser';

class App extends React.Component {
  state = {
    checking: false,
    lists: false
  }

  UNSAFE_componentWillUpdate(nextProps, nextState){
    console.log(this.state);
  }

  w3c_check = () => {

    if (document.getElementById("w3c_area").value) {

      this.setState({
        checking: true
      });

      const check_list = document.getElementById("w3c_area").value.split("\n");

      document.getElementById("w3c_result").innerHTML = "";

      let i = 0;

      const recycle = (num) => {
        if (i < check_list.length) {
          
          let encode_check_list = check_list[num];

          if(check_list[num].indexOf('http') === -1){
            encode_check_list = 'https://'+check_list[num];
          }

          this.setState({
            lists: [
              ...this.state.lists,
              {
                url : encode_check_list,
                html: {
                  errors: []
                },
                css: {
                  errors: []
                }
              }
            ]
          });

          axios.get(`https://validator.w3.org/nu/?doc=${encodeURIComponent(encode_check_list)}&out=json`)
          .then(result => {
            if(result.data.messages){
              let errors = 0;
              result.data.messages.filter((obj) => {
                if(obj.type === "error") {
                  this.setState({
                    lists: [
                      {
                        ...this.state.lists[i],
                        html: {
                          ...this.state.lists[i].html,
                          errors: [
                            ...this.state.lists[i].html.errors,
                            {
                              line: obj.lastLine,
                              extract: obj.extract,
                              message: obj.message
                            }
                          ]
                        }
                      }
                    ]
                  });
                  errors++;
                }
              });

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
                lists: [
                  {
                    ...this.state.lists[i],
                    css: {
                      ...this.state.lists[i].css,
                      errors: result.data.cssvalidation.errors
                      
                    }
                  }
                ]
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
      <div className="App">
        {/* <a id="hi098123btn" onClick={() => DocParser('hwp')}>한글(.hwp) 다운로드</a> */}
        {/* <button id="hi098123btn" onClick={() => DocParser('doc', 121)}>리스트 다운로드</button> */}
        <div className="w3c_check">
          <h3 className="tit">W3C HTML AND CSS CHECK</h3>
          <div className="w3c_check_wrap">
            <textarea id="w3c_area" placeholder="URL" readOnly={this.state.checking ? true : false}></textarea>
            <button id="w3c_btn" className={this.state.checking ? "checking" : null} onClick={this.state.checking ? null : this.w3c_check}>START</button>
            <div className="w3c_result_wrap">
              <ul id="w3c_result_header">
                <li><span>URL</span></li>
                <li><span>HTML</span></li>
                <li><span>CSS</span></li>
              </ul>
              <ul id="w3c_result">
                {/* <li class="list0">
                  <span class="url">https://www.busan.go.kr/car/crreduceship</span>
                  <span class="error">ERR(162)</span><span class="error">ERR(193)</span>
                </li> */}
                {
                  this.state.lists ?
                  <ul id="w3c_result">
                    {Object.values(this.state.lists).map((list, index) => {
                      console.log(list.url);
                      return <li className={`list${index}`} key={index}>
                        <span className="url"><a href={list.url} title="새창" target="_blank">{list.url}</a></span>
                        <span className="error">짜증나네</span>
                      </li>
                    })}
                  </ul>
                  : null
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
