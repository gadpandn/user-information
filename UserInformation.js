import React, {Component} from 'react';

class UserInformation extends Component {
    state = {
        users: []
    };

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(result => this.setState({
                users: result
            }))
    }

    render() {
        const users = this.state.users;
        return (
            <table>
                <tbody>
                <tr>
                    <th>userId</th>
                    <th>id</th>
                    <th>title</th>
                    <th>body</th>
                </tr>
                {users.map(user => (
                    <tr>
                        <td>{user.userId}</td>
                        <td>{user.id}</td>
                        <td>{user.title}</td>
                        <td>{user.body}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        )
    }
}

export default UserInformation;