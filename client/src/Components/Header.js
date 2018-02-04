import React, { Component } from 'react';
import { connect } from 'react-redux';

 class Header extends Component{
    renderContent(){
       
        switch (this.props.auth){
            case null:
            return;

            case false:
            return(
                <li><a href="/auth/facebook">Login with Facebook</a></li>
            );

            default: 
            return [
            <li key ="1"><a href="/api/logout">Logout</a></li>
        ]
        }
    }
    render(){
        // console.log(this.props.auth);
        return(
            <div className="container">
            <nav>
                   <div className="nav-wrapper black">
                       <a href="/" className="left brand-logo">NepaliLyrics</a>
                       <ul className="right">
                           {this.renderContent()}
                       </ul>
                   </div>
                </nav>
            </div>
        );
      
    }
}
function mapStateToProps({ auth }){
    return { auth };
}

export default connect(mapStateToProps)(Header);