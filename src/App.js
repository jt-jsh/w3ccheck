import React from 'react';
import axios from 'axios';
import './App.css';
// import DocParser from './DocParser';

class App extends React.Component {
  state = {
    checking: false
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

          let li = document.createElement("li");
          let url = document.createElement("span");
          let url_text = document.createTextNode(check_list[num]);
          url.appendChild(url_text);
          url.className = "url";
          li.appendChild(url);
          li.className = "list" + num;
          document.getElementById("w3c_result").appendChild(li);

          let rst = document.createElement("span");
          let rst_text;
          
          let encode_check_list = check_list[num];

          if(check_list[num].indexOf('http') === -1){
            encode_check_list = 'https://'+check_list[num];
          }

          axios.get(`https://validator.w3.org/nu/?doc=${encodeURIComponent(encode_check_list)}&out=json`)
          .then(result => {
            if(result.data.messages){
              let errors = 0;
              result.data.messages.filter((obj) => {
                if(obj.type === "error") errors++;
              });

              if(errors > 0){
                rst_text = document.createTextNode("X("+errors+")");
                rst.className = "error";
              } else {
                rst_text = document.createTextNode("O");
                rst.className = "success";
              }

              rst.appendChild(rst_text);
              li.appendChild(rst);

              css_check(num);
            }
          })
          .catch(err => {
            console.log(err);
            rst_text = document.createTextNode("ERROR");
            rst.className = "error";
            rst.appendChild(rst_text);
            li.appendChild(rst);

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

        let rst = document.createElement("span");
        let rst_text;

        let encode_check_list = check_list[num];
          
        if(check_list[num].indexOf('http') === -1){
          encode_check_list = 'https://'+check_list[num];
        }

        axios.get(`https://jigsaw.w3.org/css-validator/validator?uri=${encodeURIComponent(encode_check_list)}&profile=css3svg&output=json`)
          .then(result => {

            if (result.data.cssvalidation.errors) {
              rst_text = document.createTextNode("X("+result.data.cssvalidation.result.errorcount+")");
              rst.className = "error";
            } else {
              rst_text = document.createTextNode("O");
              rst.className = "success";
            }

            console.log("CSS Check OK");

            rst.appendChild(rst_text);
            document.querySelector(".list" + num).appendChild(rst);

            i++;
            recycle(i);
          })
          .catch(err => {
            console.log(err);

            rst_text = document.createTextNode("ERROR");
            rst.className = "error";

            rst.appendChild(rst_text);
            document.querySelector(".list" + num).appendChild(rst);

            i++;
            recycle(i);
          });
      }

      recycle(0);
    } else {
      alert("url을 작성하세요");
      document.getElementById("w3c_area").focus();
    }
  }

  render() {
    return (
      <div className="App">
        {/* <a id="hi098123btn" onClick={() => DocParser('hwp')}>한글(.hwp) 다운로드</a> */}
        {/* <button id="hi098123btn" onClick={() => DocParser('doc', 121)}>리스트 다운로드</button> */}
        <div className="w3c_check">
          <h3 className="tit">W3C HTML/CSS Check</h3>
          <textarea id="w3c_area" placeholder="url을 작성하세요.(구분 - 줄바꿈)" readOnly={this.state.checking ? true : false}></textarea>
          <button id="w3c_btn" className={this.state.checking ? "checking" : null} onClick={this.state.checking ? null : this.w3c_check}>검사</button>
          <div className="w3c_result_wrap">
            <ul id="w3c_result_header">
              <li><span>URL</span></li>
              <li><span>HTML</span></li>
              <li><span>CSS</span></li>
            </ul>
            <ul id="w3c_result">

            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
