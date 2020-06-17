import React from 'react';

export default w3c = () => {
    return (
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
                        {Object.values(this.state.lists).map((list, index) => {
                            console.log(this.state.lists);
                            return <li className={`list${index}`} key={index}>
                                <div className="head">
                                    <span className="url"><a href={list.url} title="새창" target="_blank" rel="noopener noreferrer">{list.url}</a></span>
                                    <span className={list.html.errors ? 'error' : 'pass'}>{list.html.errors ? `ERROR[${Object.keys(list.html.errors).length}]` : 'PASS'}</span>
                                    <span className={list.css.errors ? 'error' : 'pass'}>{list.css.errors ? `ERROR[${Object.keys(list.css.errors).length}]` : 'PASS'}</span>
                                </div>
                                <div className="body">
                                    <div className="html_result">
                                        <h4 className="tit">HTML CHECKED RESULT</h4>
                                        <ul className="result_list">
                                            {list.html.errors ?
                                                Object.values(list.html.errors).map((item, index) => {
                                                    return <li key={index}>
                                                        <div className="line">line{item.line}</div>
                                                        <div className="extract">{item.extract}</div>
                                                        <div className="message">{item.message}</div>
                                                    </li>
                                                })
                                                : <li>No Error!</li>}
                                        </ul>
                                    </div>
                                    <div className="css_result">
                                        <h4 className="tit">CSS CHECKED RESULT</h4>
                                        <ul className="result_list">
                                            {list.css.errors ?
                                                Object.values(list.css.errors).map((item, index) => {
                                                    return <li key={index}>
                                                        <div className="line">line{item.line}</div>
                                                        <div className="source">{item.source}</div>
                                                        <div className="message">{item.message}</div>
                                                    </li>
                                                })
                                                : <li>No Error!</li>}
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}
