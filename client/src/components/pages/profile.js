import React, { Component } from "react";
import UserProfile from "../scripts/UserProfile";
import { Navigate } from "react-router-dom";
import "../css/Main.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      email: UserProfile.getName(),
      person: null,
    };
  }

  async componentDidMount() {
    const url = "/login/";
    const response = await fetch(url + this.state.email);
    const data = await response.json();
    this.setState({ person: data, loading: false });
  }

  renderRedirect = () => {
    return <Navigate to="/login" />;
  };

  render() {
    return (
      <>
        {this.state.loading || !this.state.person ? (
          <div>
            <table class="profilePage">
              <tr>
                <td>
                  <img
                    class="userImage"
                    src="https://img.icons8.com/external-bearicons-glyph-bearicons/344/ffffff/external-User-essential-collection-bearicons-glyph-bearicons.png"
                  />
                  <span class="profileHeading">STATUS: OFFLINE</span>
                </td>
              </tr>
            </table>
          </div>
        ) : (
          <div>
            <table class="profilePage">
              <tr>
                <td>
                  <img
                    class="userImage"
                    src="https://img.icons8.com/external-bearicons-glyph-bearicons/344/ffffff/external-User-essential-collection-bearicons-glyph-bearicons.png"
                  />
                  <span class="profileHeading">
                    Welcome to KV-SYN, {this.state.person.firstName}!
                  </span>
                  <hr class="horizontalLine" />
                  <h4> Account Information </h4>
                  <p> First: {this.state.person.firstName}</p>
                  <p> Last: {this.state.person.lastName}</p>
                  <p> Email: {this.state.person.email}</p>

                  <div class="recordings_pp">
                    <h4> Recordings </h4>
                    <hr class="horizontalLine" />
                  </div>
                </td>
              </tr>
            </table>
          </div>
        )}
      </>
    );
  }
}
export default Profile;
