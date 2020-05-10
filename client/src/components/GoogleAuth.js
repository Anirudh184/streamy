import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '806774496126-klifb5i7oivupd4ml31bee0glf6mcgfi.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.updateAuth(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.updateAuth);
            });
        });
    }

    handleSignIn = () => {
        this.auth.signIn();
    };

    handleSignOut = () => {
        this.auth.signOut();
    }

    updateAuth = (isSignedIn) => { 
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    getAuthStatus = () => {
        if(this.props.isSignedIn === null) {
            return null;
        } else if(this.props.isSignedIn) {
            return (
                <button onClick = {this.handleSignOut} className = "ui red google button">
                    <i className = "google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick = {this.handleSignIn} className = "ui red google button">
                    <i className = "google icon" />
                    Sign In
                </button>
            ); 
        }
    }

    render() {
        return(
            <div>{this.getAuthStatus()}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
} 

export default connect(mapStateToProps, {
    signIn, signOut
})(GoogleAuth);