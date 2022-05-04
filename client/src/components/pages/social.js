import React, { Component, useRef } from 'react';
import { Navigate } from "react-router-dom";
import '../css/social.css';
import fileImage from "../resources/upload.ico";

class Social extends Component {
  constructor(props) {
    super(props);
  }



	render () {
		return (
			<div>
            <hr />

            {/* FORMS FOR POSTING -- START*/}
            <div class="formInputs">
                <form>
                    {/* TEXT SUBMISSION */}
                    <label style={{color: 'white'}}>
                        <textarea placeholder="Say something..." type="text" name="name" />
                    </label><br />
                    <input type="submit" value="Post" />

                    {/* FILE UPLOAD -- NEED TO MAKE SURE FILE == IMG */}
                    <span class="image-upload">
                    <label class="image-upload" for="file-input">
                        <img style={{height: 20, width: 20}}src={fileImage}/>
                    </label>
                    <input id="file-input" type="file"/>
                    </span>

                </form>
            </div>
            {/* FORMS FOR POSTING -- END*/}

                {/* TABLE FOR COMMENTS*/}
                <table class="MainTable">
                <hr />
                {/* COMMENT 1 EXAMPLE -- START (GENERATE THIS BLOCK OF CODE WITH EVERY COMMENT STORED IN DATABASE)*/}
                    <tr class="commentSpace">
                        <td class="comment">
                            <table>
                                <td class="profilePic">
                                    <img class="userImage" style={{height: 50}} src="https://img.icons8.com/external-bearicons-glyph-bearicons/344/ffffff/external-User-essential-collection-bearicons-glyph-bearicons.png"/>
                                </td>
                                <td>
                                    <table class="commentItems">
                                        <tr class="nameAndTime">
                                            <td class="commenterName">
                                                Seth Klupka
                                            </td>
                                            <td class="timeStamp">
                                                · 6m
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" class="commentText">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mollis, est vel lobortis facilisis, augue turpis maximus erat, a gravida augue dolor vitae leo. Quisque viverra eros ac semper accumsan.
                                            </td>
                                        </tr>

                                        {/* OPTIONAL IMAGE -- START*/}
                                        <tr>
                                            <img class="postImage" style={{height: 300}} src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=640:*"/>
                                        </tr>
                                        {/* OPTIONAL IMAGE -- END*/}
                                    </table>
                                </td>
                            </table>
                        </td>
                    </tr>
                    <hr />
                    {/* COMMENT 1 EXAMPLE -- END*/}

                    {/* COMMENT 2 EXAMPLE -- START*/}
                        <tr class="commentSpace">
                            <td class="comment">
                                <table>
                                    <td class="profilePic">
                                        <img class="userImage" style={{height: 50}} src="https://img.icons8.com/external-bearicons-glyph-bearicons/344/ffffff/external-User-essential-collection-bearicons-glyph-bearicons.png"/>
                                    </td>
                                    <td>
                                        <table class="commentItems">
                                            <tr class="nameAndTime">
                                                <td class="commenterName">
                                                    Vi Vu
                                                </td>
                                                <td class="timeStamp">
                                                    · 19m
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" class="commentText">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mollis, est vel lobortis facilisis, augue turpis maximus erat, a gravida augue dolor vitae leo. Quisque viverra eros ac semper accumsan.
                                                </td>
                                            </tr>
                                            {/* OPTIONAL IMAGE -- START*/}
                                            <tr>
                                                <img class="postImage" style={{height: 300}} src="https://image.cnbcfm.com/api/v1/image/105992231-1561667465295gettyimages-521697453.jpeg?v=1561667497&w=1600&h=900"/>
                                            </tr>
                                            {/* OPTIONAL IMAGE -- END*/}
                                        </table>
                                    </td>
                                </table>
                            </td>
                        </tr>
                        <hr />
                        {/* COMMENT 2 EXAMPLE -- END*/}
                </table>
			</div>
		)
	};
}

export default Social;
