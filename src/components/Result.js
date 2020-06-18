import React, { useContext } from 'react';
import { W3C_Context } from '../contexts/W3C_Context';
import styled from 'styled-components';

const Result = () => {
    const { lists } = useContext(W3C_Context);

    function resultOpenHandler(e){
        document.getElementById(`result${e}`).style.display = "block";
    }

    return (
        <Wrap>
            <ResultHeader>
                <ResultHeaderLi>URL</ResultHeaderLi>
                <ResultHeaderLi>HTML</ResultHeaderLi>
                <ResultHeaderLi>CSS</ResultHeaderLi>
            </ResultHeader>
            <ResultBody>
                {Object.values(lists).map((list, index) => {
                    return <ResultBodyLi key={index}>
                        <Head onClick={() => resultOpenHandler(index)}>
                            <HeadSpan><a href={list.url} title="새창" target="_blank" rel="noopener noreferrer">{list.url}</a></HeadSpan>
                            <HeadSpan state={list.html.errors ? 'error' : 'pass'}>{list.html.errors ? `ERROR[${Object.keys(list.html.errors).length}]` : 'PASS'}</HeadSpan>
                            <HeadSpan state={list.css.errors ? 'error' : 'pass'}>{list.css.errors ? `ERROR[${Object.keys(list.css.errors).length}]` : 'PASS'}</HeadSpan>
                        </Head>
                        <Body id={`result${index}`}>
                            <Html>
                                <Title>HTML CHECKED RESULT</Title>
                                <List>
                                    {list.html.errors ?
                                        Object.values(list.html.errors).map((item, index) => {
                                            return <Item key={index}>
                                                <Row flex='1' weight='bold' color='#f33'>line{item.line}</Row>
                                                <Row flex='6' background='#333' color='#fff'>{item.extract}</Row>
                                                <Row>{item.message}</Row>
                                            </Item>
                                        })
                                        : <Item>No Error!</Item>}
                                </List>
                            </Html>
                            <Css>
                                <Title>CSS CHECKED RESULT</Title>
                                <List>
                                    {list.css.errors ?
                                        Object.values(list.css.errors).map((item, index) => {
                                            return <Item key={index}>
                                                <Row flex='1' weight='bold' color='#f33'>line{item.line}</Row>
                                                <Row flex='6' background='#333' color='#fff'>{item.source}</Row>
                                                <Row>{item.message}</Row>
                                            </Item>
                                        })
                                        : <Item>No Error!</Item>}
                                </List>
                            </Css>
                        </Body>
                    </ResultBodyLi>
                })}
            </ResultBody>
        </Wrap>
    )
}

const Wrap = styled.div`
    margin-top:20px;
    background:#fff;
    border:1px solid #ccc;
    border-radius: 5px;
`;

const ResultHeader = styled.ul`
    display:flex;
    flex-flow: row nowrap;
`;

const ResultHeaderLi = styled.li`
    width:33.33333%;
    text-align: center;
    padding:10px;
    font-weight: bold;
`;

const ResultBody = styled.ul`

`;

const ResultBodyLi = styled.li`
    border-top:1px solid #ccc;
`;

const Head = styled.div`
    display:flex;
    flex-flow: row nowrap;
    cursor: pointer;
`;

const HeadSpan = styled.span`
    width:33.3333%;
    text-align: center;
    display:block;
    padding:10px;
    word-break: break-all;
    color: ${props => props.state == 'error' ? '#f33' : 'rgb(26,115,232)'}
`;

const Body = styled.div`
    display:none;
`;

const Title = styled.h4`
    font-size:1.1em;
    margin-bottom:10px;
`;

const Html = styled.div`
    padding: 15px;
`;

const Css = styled.div`
    padding: 15px;
    padding-top:0;
`;

const List = styled.ul`
    background: #fbfbfb;
    padding:15px;
`;

const Item = styled.li`
    display: flex;
    flex-flow: row wrap;
    &:not(:last-child) {
       margin-bottom:10px;
       padding-bottom:5px;
       border-bottom:1px solid #ddd;
    }
`;

const Row = styled.div`
    padding:5px;
    border-radius:5px;
    word-break: break-all;
    ${props => props.flex ? `flex:${props.flex};` : 'width:100%;'}
    ${props => props.color ? `color:${props.color};` : null}
    ${props => props.weight ? `font-weight:${props.weight};` : null}
    ${props => props.background ? `background:${props.background};` : null}
`;

export default Result;