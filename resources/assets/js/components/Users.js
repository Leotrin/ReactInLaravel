import React from 'react';
import ReactDOM from 'react-dom';

export default class Users extends React.Component{
    constructor(){
        super();
        this.state = {
            data:[],
            url:'http://localhost:8000/api/users',
            pagination:[],
            hideClass:'btn btn-default '
        }
    }
    componentWillMount(){
        this.fetchUsers();
    }
    fetchUsers(){
        let $this = this;
        axios.get(this.state.url).then(response=>{
            $this.setState({
                data:$this.state.data.length > 0 ? $this.state.data.concat(response.data.data) : response.data.data,
                url:response.data.next_page_url
            });
            console.log(response.data.next_page_url);
            if(response.data.next_page_url==null){
                $this.setState({
                    hideClass:'btn btn-default hideButton'
                })
            }
            $this.makePagination(response.data);
        }).catch(error=>{
            console.log(error);
        });
    }
    loadMore(){
        let $this = this;
        $this.setState({
            url: this.state.pagination.next_page_url
        });

        $this.fetchUsers();
    }
    makePagination(data){
        let pagination = {
            current_page: data.current_page,
            last_page:data.last_page,
            next_page_url:data.next_page_url,
            prev_page_url:data.prev_page_url,
        }

        this.setState({
            pagination:pagination
        })
    }

    deleteUser(user, object){
        console.log(user);
        var $this = object;
        axios.delete('http://localhost:8000/api/users/'+user.id).then(response=>{
            console.log(response);

            const newState = $this.state.data.slice();
            newState.splice(newState.indexOf(user),1);
            $this.setState({
                data:newState
            })
        }).catch(error=>{
            console.log(error);
        })
    }
    render(){
        return (
            <div>
                <h3>Users</h3>
                <a href={'http://localhost:8000/users/create'}>Create new user</a>
                <table className="table table-borderd">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Email</td>
                            <td>Name</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map((user,i) => (
                        <UserRow key={i} i={i} user={user} object={this} />
                    ))}
                    </tbody>
                </table>
                <div className="col-md-12 text-center">
                    <button className={this.state.hideClass} onClick={this.loadMore.bind(this)}>Load More</button>
                </div>
            </div>
        )
    }
}

export class UserRow extends React.Component{
    deleteUser(user, object){
        console.log(user);
        var $this = object;
        axios.delete('http://localhost:8000/api/users/'+user.id).then(response=>{
            console.log(response);

            const newState = $this.state.data.slice();
            newState.splice(newState.indexOf(user),1);
            $this.setState({
                data:newState
            })
        }).catch(error=>{
            console.log(error);
        })
    }
    render(){
        return(
            <tr key={this.props.i}>
                <td>{this.props.user.id}</td>
                <td>{this.props.user.email}</td>
                <td>{this.props.user.name}</td>
                <td>
                    <a href={"/users/"+this.props.user.id+"/edit"} className="btn btn-primary">Edit</a> ||&nbsp;
                    <a href="javascript:;" className="btn btn-danger" onClick={this.deleteUser.bind(this, this.props.user, this.props.object)}>Delete</a>
                </td>
            </tr>
        )
    }
}
if(document.getElementById('users')) {
    ReactDOM.render(<Users />,
        document.getElementById('users')
    );
}