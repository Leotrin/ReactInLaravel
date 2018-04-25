import React from 'react';
import ReactDOM from 'react-dom';

export default class EditUser extends React.Component{
    constructor(){
        super();
        this.state = {
            name:'',
            email:'',
            password:''
        }
    }
    componentWillMount(){
        let id = this.props.id;

        axios.get('http://localhost:8000/api/users/'+id).then(response=>{
            console.log(response.data);
            var user = response.data;
            this.setState({
                name: user.name,
                email: user.email
            });
        }).catch(error=>{
            console.log(error);
        })
    }
    handleNameChange(e){
        this.setState({
            name:e.target.value
        })
    }
    handleEmailChange(e){
        this.setState({
            email:e.target.value
        })
    }
    handlePasswordChange(e){
        this.setState({
            password:e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault();
        axios.patch('http://localhost:8000/api/users/'+this.props.id, this.state).then(response =>{
            console.log(response);
            window.location = '/home';
        }).catch(error=>{
            console.log(error);
        });
    }
    render(){
        return (
            <div>
                <h2>Edit User</h2>
                <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group" >
                        <input type="text" name="name" id="name" placeholder="Name"
                               className="form-control" value={this.state.name}
                               onChange={this.handleNameChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" id="email" placeholder="Email"
                               className="form-control" value={this.state.email}
                               onChange={this.handleEmailChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" id="pwd" placeholder="Password"
                               className="form-control" value={this.state.password}
                               onChange={this.handlePasswordChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        )
    }
}

if(document.getElementById('edit')) {
    var id = $('#edit').data('id');
    ReactDOM.render(<EditUser id={id}/>,
        document.getElementById('edit')
    );
}