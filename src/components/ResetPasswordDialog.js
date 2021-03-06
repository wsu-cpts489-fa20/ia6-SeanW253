import React from 'react'
import ResetPasswordDialog2 from './ResetPasswordDialog2.js';

class ResetPasswordDialog extends React.Component {
    constructor() {
        super();
        //Create a ref for the email input DOM element
        this.newUserRef = React.createRef();
        this.repeatPassRef = React.createRef();
        this.profilePicRef = React.createRef();
        this.state = {accountName: "",
                      displayName: "",
                      profilePicDataURL: "",
                      profilePicURL: "https://icon-library.net//images/default-profile-icon/default-profile-icon-24.jpg",
                      accountPassword: "",
                      accountPasswordRepeat: "",
                      accountSecurityQuestion: "Who Dis1",
                      accountSecurityAnswer: "",
                      showResetPasswordDialog2: false};

    }

    //checkAccountValidity -- Callback function invoked after a form element in
    //the 'Create Account' dialog box changes and component state has been
    //updated. We need to check whether the passwords match. If they do not, 
    //we set a custom validity message to be displayed when the user clicks the
    //'Create Account' button. Otherwise, we reset the custom validity message
    //to empty so that it will NOT fire when the user clicks 'Create Account'.
    checkAccountValidity = () => {
        // if (this.state.accountPassword != this.state.accountPasswordRepeat) {
        //     //Passwords don't match
        //     this.repeatPassRef.current.setCustomValidity(
        //     "This password must match original password.");
        // } else {
        //     this.repeatPassRef.current.setCustomValidity("");
        // }
        let data = JSON.parse(localStorage.getItem(this.newUserRef.current.value));
        if (data != null) {
            //The user name is already taken
            this.newUserRef.current.setCustomValidity("Account found"); //take to next dialog box
        } else {
            this.newUserRef.current.setCustomValidity("");
        }
    }

    //handleNewAccountChange--Called when a field in a dialog box form changes.
    handleNewAccountChange = (event) => {
        this.setState({[event.target.name]: event.target.value});//,this.checkAccountValidity);
    } 

    //setDefaultDisplayName -- Triggered by onBlur() event of Email field.
    //Sets default value of display name to value entered into Email field 
    //as a courtesy.
    setDefaultDisplayName = (event) => {
      if (event.target.value.length > 0 && this.state.displayName === "") {
        this.setState({displayName: event.target.value});
      }
    }

    //handleDialog1 - after the first dialog box, user finishes entering username, take to
    //the next dialog
    handleDialog1 = (event) => {
        event.preventDefault();

        this.checkAccountValidity();

        //set the show state for dialog 2 to true
        this.setState({showResetPasswordDialog2: true})

        this.getSecurityQuestion();

    }

    //handleDialog2 - security question
    handleDialog2 = (event) => {
        event.preventDefault();

        
    }

    getSecurityQuestion = () => {
        let user = this.state.accountName;

        let data = JSON.parse(localStorage.getItem(user));

        this.setState({accountSecurityQuestion: data.securityQuestion})
        this.setState({accountSecurityAnswer: data.securityAnswer})
    }

    //cancel button
    cancelDialog2 = () => {
        this.setState({showResetPasswordDialog2: false})
    }

    render() {
    return (
    <div className="modal" role="dialog">
        <div className="modal-dialog modal-lg">
        <div className="modal-content">
            <div className="modal-header">
            <center>
            <h3 className="modal-title"><b>Enter your email address</b></h3>
            </center>
            <button className="close" 
                onClick={this.props.cancelResetPasswordDialog}>
                &times;</button>
            </div>
            <div className="modal-body">
            <form onSubmit={this.handleDialog1}>
            <label>
                Email: 
                <input
                className="form-control form-text form-center"
                name="accountName"
                type="email"
                size="35"
                placeholder="Enter Email Address"
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
                required={true}
                ref={this.newUserRef}
                value={this.state.accountName}
                onChange={this.handleNewAccountChange}
                onBlur={this.setDefaultDisplayName}
                />
            </label>
            <button role="submit"
                className="btn btn-primary btn-color-theme modal-submit-btn">
                <span className="fa fa-user-plus"></span>&nbsp;Next
            </button>
            </form>
            {this.state.showResetPasswordDialog2 ? 
            <ResetPasswordDialog2 
                cancelDialog2={this.cancelDialog2}
                accountSecurityQuestion={this.state.accountSecurityQuestion}
                accountSecurityAnswer={this.state.accountSecurityAnswer}
                accountName={this.state.accountName} /> : null}
            </div>
        </div>
        </div>
    </div>
    );
    }
}

export default ResetPasswordDialog;