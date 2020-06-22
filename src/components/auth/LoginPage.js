import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import "./SpinnerLoader.css";

class LoginPage extends React.Component{
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            email: '', 
            password: '',
            submitted: false,
            isLoading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true, isLoading: true });
        const { email, password } = this.state;
        if (email && password) {
            this.props.login(email, password);
            this.setState({ isLoading: false })
        }
    }

    render(){
        const { email, password, isLoading } = this.state;
        return(
            <div>
                <div className="account-pages"/>
                <div className="clearfix"/>
                <div className="wrapper-page">
                    <div className=" card-box">
                        <div className="panel-heading"> 
                            <h3 className="text-center"> Sign In to <strong className="text-custom">Attendee</strong> </h3>
                        </div> 
    
                        <div className="panel-body">
                            <form className="form-horizontal m-t-20" onSubmit={this.handleSubmit}>
                                <div className="form-group ">
                                    <div className="col-xs-12">
                                        <input className="form-control" type="email" name="email" required value={email} placeholder="Email" onChange={this.handleChange}/>
                                    </div>
                                </div>
    
                                <div className="form-group">
                                    <div className="col-xs-12">
                                        <input className="form-control" type="password" name="password" required value={password} placeholder="Password" onChange={this.handleChange}/>
                                    </div>
                                </div>
    
                                <div className="form-group ">
                                    <div className="col-xs-12">
                                        <div className="checkbox checkbox-primary">
                                            <input id="checkbox-signup" type="checkbox"/>
                                            <label htmlFor="checkbox-signup">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                </div>
    
                                <div className="form-group text-center m-t-40">
                                    <div className="col-xs-12">
                                        <button className="btn btn-pink btn-block text-uppercase waves-effect waves-light" type="submit" disabled={isLoading}>
                                            { isLoading &&  <i className="spinner-border"> </i> }
                                            { isLoading &&  <span> Loading </span> }
                                            { !isLoading &&  <span> Log In </span> }
                                        </button>
                                    </div>
                                </div>
    
                                <div className="form-group m-t-30 m-b-0">
                                    <div className="col-sm-12">
                                        <a href="#" className="text-dark"><i className="fa fa-lock m-r-5"></i> Forgot your password?</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
    
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <p>Don't have an account?
                                <a href={'/registrasi'}>
                                    <b> Sign Up</b>
                                </a> 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };