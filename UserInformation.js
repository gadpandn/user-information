import React, {Component} from 'react';
import ReactDOM from 'react-dom',
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router-dom'

class UserInformation extends Component {
    state = {
        users: [],
        batchOfUsers: [],
        startIndex: 0,
        userDetails: [],
        showModalWindow : false
    };
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(result => this.setState({
                users: result,
                batchOfUsers: result.filter((ele, index) => index < 10)
            }))
    }
    
    getBatchOfUsers(result, start) {
        let output = result.filter((item, index) => (start <= index && index < start + 10));
        if (output.length === 0) {
            console.log('hr')
        }
        return output
    }
    
    prevLinkHandler = (startIndex) => {
        if (startIndex === 0) {
            return false
        }
        this.setState({
            startIndex: this.state.startIndex - 10,
            batchOfUsers: this.getBatchOfUsers(this.state.users, (this.state.startIndex - 10))
        });
    };
    
    nextLinkHandler = (startIndex) => {
        if (startIndex === 90) {
            console.log(startIndex);
            return false
        }
        this.setState({
            startIndex: this.state.startIndex + 10,
            batchOfUsers: this.getBatchOfUsers(this.state.users, (this.state.startIndex + 10)),
        })
    };
    startBtnHandler = () => {
        this.setState({
            startIndex: 0,
            batchOfUsers: this.getBatchOfUsers(this.state.users, 0),
        })
    };
    
    endBtnHandler = () => {
        this.setState({
            startIndex: 90,
            batchOfUsers: this.getBatchOfUsers(this.state.users, 90),
        })
    };
    openWindow = (userId) => {
        console.log('hi');
        this.setState({
            showModalWindow: true,
            userDetails: this.state.users.filter((ele) => ele.id === userId)
        })
    };
    closeWindow = () => {
        this.setState({
            showModalWindow: false
        })
    };
    
    render() {
        const users = this.state.batchOfUsers;
        return (
            <div>
                <table>
                    <tbody>
                    <tr>
                        <th>userId</th>
                        <th>id</th>
                        <th>title</th>
                        <th>body</th>
                    </tr>
                    {
                        
                        users.map(user => (
                            <tr>
                                <td onClick={this.openWindow.bind(this, user.id)}>{user.userId}</td>
                                <td>{user.id}</td>
                                <td>{user.title}</td>
                                <td>{user.body}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination nextBtnHandler={this.nextLinkHandler.bind(this, this.state.startIndex)}
                            prevBtnHandler={this.prevLinkHandler.bind(this, this.state.startIndex)}
                            startBtnHandler={this.startBtnHandler.bind(this)}
                            endBtnHandler={this.endBtnHandler.bind(this)}
                />
                {
                    this.state.showModalWindow && (
                        <UserInfo closeWindow={this.closeWindow}>
                        {
                            this.state.userDetails.map(user => (
                                <div>{user.body}</div>
                            ))
                        }
                </UserInfo>)
                }
            </div>
        )
        
    }
}

let Pagination = (props) => {
    return (
        <div>
            <a onClick={() => props.startBtnHandler()}> start </a>
            <a onClick={() => props.prevBtnHandler(props.startIndex)}> prev </a>
            <a onClick={() => props.nextBtnHandler(props.startIndex)}> next </a>
            <a onClick={() => props.endBtnHandler()}> end </a>
        </div>
    )
};

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.container = document.createElement('div');
        this.modalWindow = null;
    }
    
    componentDidMount() {
        this.modalWindow = window.open('', '', 'width=600,height=400,left=200,top=200');
        this.modalWindow.document.body.appendChild(this.container);
        
        this.modalWindow.addEventListener('beforeunload',() => {
            this.props.closeWindow();
        })
    
    }
    componentWillUnmount() {
        this.modalWindow.close();
    }
    render() {
        return ReactDOM.createPortal(this.props.children, this.container);
    };
}

export default UserInformation;