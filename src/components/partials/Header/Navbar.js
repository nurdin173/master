import React, { Component } from 'react';
import $ from 'jquery';

class Navbar extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount = () => {
        $('.open-left').on('click', function(){

            $("#wrapper").toggleClass("enlarged");
            $("#wrapper").addClass("forced");

            if($("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left")) {
                $("body").removeClass("fixed-left").addClass("fixed-left-void");
              } else if(!$("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left-void")) {
                $("body").removeClass("fixed-left-void").addClass("fixed-left");
              }
              
              if($("#wrapper").hasClass("enlarged")) {
                $(".left ul").removeAttr("style");
              } else {
                $(".subdrop").siblings("ul:first").show();
              }
              
              $("body").trigger("resize");
        })
    }

    render(){
        return(
            <>
                <div className="pull-left">
                    <button className="button-menu-mobile open-left waves-effect waves-light">
                        <i className="md md-menu"></i>
                    </button>
                    <span className="clearfix"></span>
                </div>
            </>
        );
    }
}

export default Navbar;
