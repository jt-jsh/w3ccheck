import React from 'react';
import axios from 'axios';
import './App.css';

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

          axios.get(`https://validator.w3.org/nu/?doc=https%3A%2F%2F${encodeURIComponent(check_list[num])}`)
            .then(result => {

              if (result.data.indexOf('class="error"') !== -1) {
                rst_text = document.createTextNode("X");
                rst.className = "error";
              } else {
                rst_text = document.createTextNode("O");
                rst.className = "success";
              }

              console.log("HTML Check OK");

              rst.appendChild(rst_text);
              li.appendChild(rst);

              css_check(num);
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

        axios.get(`https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2F${encodeURIComponent(check_list[num])}&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=ko`)
          .then(result => {

            if (result.data.indexOf('id="errors"') !== -1) {
              rst_text = document.createTextNode("X");
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
