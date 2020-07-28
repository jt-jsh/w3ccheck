import React, { Component } from 'react';
import axios from 'axios';
import { W3C_Context } from '../contexts/W3C_Context';
import styled from 'styled-components';

import Form from './Form';
import Result from './Result';

class W3C extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checking: false,
            lists: false
        }
    }

    UNSAFE_componentWillUpdate(){
        console.log(this.state);
    }

    w3cCheck = () => {

        if (document.getElementById("w3c_area").value) {

            this.setState({
                checking: true
            });

            const check_list = document.getElementById("w3c_area").value.split("\n");

            let i = 0;

            const recycle = (num) => {
                if (i < check_list.length) {

                    let encode_check_list = check_list[num];

                    if (check_list[num].indexOf('http') === -1) {
                        encode_check_list = 'https://' + check_list[num];
                    }

                    this.setState({
                        lists: {
                            ...this.state.lists,
                            [i]: {
                                url: encode_check_list,
                                html: {
                                    errors: 'wait'
                                },
                                css: {
                                    errors: 'wait'
                                }
                            }
                        }
                    });

                    axios.get(`https://validator.w3.org/nu/?doc=${encodeURIComponent(encode_check_list)}&out=json`)
                        .then(result => {
                            if (result.data.messages) {

                                let count = 0;

                                this.setState({
                                    lists: {
                                        ...this.state.lists,
                                        [i]: {
                                            ...this.state.lists[i],
                                            html: {
                                                errors: {}
                                            }
                                        }
                                    }
                                });

                                result.data.messages.filter((obj, index) => {
                                    if (obj.type === "error") {

                                        count++;

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

                                if(count === 0){
                                    this.setState({
                                        lists: {
                                            ...this.state.lists,
                                            [i]: {
                                                ...this.state.lists[i],
                                                html: {
                                                    ...this.state.lists[i].html,
                                                    errors: 'pass'
                                                }
                                            }
                                        }
                                    });
                                }

                                console.log("HTML CHECK OK");

                                css_check(num);
                            }
                        })
                        .catch(err => {
                            console.log(err);

                            this.setState({
                                lists: {
                                    ...this.state.lists,
                                    [i]: {
                                        ...this.state.lists[i],
                                        html: {
                                            ...this.state.lists[i].html,
                                            errors: 'fail'
                                        }
                                    }
                                }
                            });

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

                if (check_list[num].indexOf('http') === -1) {
                    encode_check_list = 'https://' + check_list[num];
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
                                            errors: result.data.cssvalidation.errors ? result.data.cssvalidation.errors : 'pass'
                                        }
                                    }
                                }
                            })
                        }

                        console.log("CSS CHECK OK");

                        console.log(this.state)

                        i++;
                        recycle(i);
                    })
                    .catch(err => {
                        console.log(err);
                        
                        this.setState({
                            lists: {
                                ...this.state.lists,
                                [i]: {
                                    ...this.state.lists[i],
                                    css: {
                                        errors: 'fail'
                                    }
                                }
                            }
                        })
                        
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
            <W3C_Context.Provider value={this.state}>
                <W3CCheck>
                    <Title>W3C Api Markup and CSS Validation Service</Title>
                    <W3CCheckWrap>
                        <Form w3cCheck={this.w3cCheck}/>
                        <Result/>
                    </W3CCheckWrap>
                </W3CCheck>
            </W3C_Context.Provider>
        )
    }
}

const W3CCheck = styled.div`
    max-width:1000px;
    margin: 0 auto;
`;

const Title = styled.h3`
    font-size:2em;
    margin-bottom: 10px;
`;

const W3CCheckWrap = styled.div`
    padding: 15px;
    background:#fff;
    box-shadow: 0 0 5px rgba(0,0,0,.15);
    border-radius: 10px;
    overflow: hidden;
`;

export default W3C;