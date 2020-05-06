import Form from "./Form";
import swal from "sweetalert";
import React from "react";
import {SERVER_URI} from "../Constants/Constants";

class SignupForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      passwordrepeat: ''
    };
    this.myChangeHandler = this.myChangeHandler.bind(this);
  }
  mySubmitHandler = (event) => {
    event.preventDefault();
    let password = event.target.password;
    let passwordRep = event.target.passwordrepeat;
    let firstname = event.target.firstname;
    let lastname = event.target.lastname;
    let email = event.target.email;
    let name = (firstname.value).concat(lastname.value);
    if (!(name.match(/^[a-zA-Z]+$/)) && !(name.match(/^[\u0600-\u06FF\s]+$/))) {
      swal({
        title: "خطا",
        text: "نام و نام خانوادگی شما اشتباه وارد شده است!",
        icon: "error",
        dangerMode: true,
        button: {
          text: "بستن",
          value: null,
          visible: true,
          closeModal: true,
        },
      });
      return
    }
    if (password.value !== passwordRep.value) {
      swal({
        title: "خطا",
        text: "تکرار رمز عبور اشتباه وارد شده است!",
        icon: "error",
        dangerMode: true,
        button: {
          text: "بستن",
          value: null,
          visible: true,
          closeModal: true,
        },
      });
    }
    else {
      console.log(this.state)
      let response = this.signup();
      if (response.ok) {
        this.setState({
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          passwordrepeat: ''
        })
        password.value = '';
        passwordRep.value = '';
        firstname.value = '';
        lastname.value = '';
        email.value = '';
        this.props.redirect("/login");
      }
    }
  }

  render() {
    return (
        <form className="text-center p-5" id="signup" onSubmit={this.mySubmitHandler}>
          <p className="h4 mb-4">ثبت نام</p>
          <input type="text" required name="firstname" className="form-control mb-4" placeholder="نام" onChange={this.myChangeHandler}/>
          <input type="text" required name="lastname" className="form-control mb-4" placeholder="نام خانوادگی" onChange={this.myChangeHandler}/>
          <input type="email" required name="email" className="form-control mb-4" placeholder="ایمیل" onChange={this.myChangeHandler}/>
          <input type="password" required name="password" className="form-control mb-4" placeholder="رمز عبور" onChange={this.myChangeHandler}/>
          <input type="password" required name="passwordrepeat" className="form-control mb-4" placeholder="تکرار رمز عبور"/>
          <button className="btn cyan-btn" type="submit">ثبت نام</button>
        </form>
    );
  }

  signup() {
    let response;
    let body = this.state;
    fetch(SERVER_URI + "/users", {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }
    )
        .then(res => res.json())
        .then(
            (result) => {
              response = result;
            }
        );
    return response;
  }
}

export default SignupForm;