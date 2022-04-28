import React from "react";
import '../css/Main.css';

export const Profile = () => {
    return (
        <div>
       <table class="profilePage">
            <tr>
                <td>

                        <img class="userImage" src="https://img.icons8.com/external-bearicons-glyph-bearicons/344/ffffff/external-User-essential-collection-bearicons-glyph-bearicons.png"/>
                        <span class="profileHeading">John Doe</span>
                        <hr class="horizontalLine" />
                        <h4> Account Information </h4>
                        <p> First: </p><p> Last: </p><p> Email: </p>

                        <div class="recordings_pp">
                            <h4> Recordings </h4>
                            <hr class="horizontalLine" />
                        </div>
                </td>
            </tr>
       </table>
       </div>
    );
  };

export default Profile;
