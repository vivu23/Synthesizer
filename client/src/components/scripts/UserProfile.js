var UserProfile = (function() {
    var full_name = "";
    var main_session = false;
  
    var getName = function() {
      return full_name;    // Or pull this from cookie/localStorage
    };
  
    var setName = function(name) {
      full_name = name;     
      // Also set this in cookie/localStorage
    };

    return {
      getName: getName,
      setName: setName
    }
  
  })();
  
  export default UserProfile;