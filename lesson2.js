/**
 * Created by Michael on 13.04.2017.
 */

function CheckLogin(inputClass) {
  var inputField = document.querySelector(inputClass),
      xhr = new XMLHttpRequest(),
      message = "&#10004;",
      logins,
      outputField;

  xhr.open("GET", "response1.json", true);
  xhr.send();

  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) {
      return;
    }

    if (xhr.status != 200) {
      alert(xhr.status + ": " + xhr.statusText);
    } else {
      try {
        logins = JSON.parse(xhr.responseText);
      } catch (e) {
        alert("Incorrect response " + e.message);
      }
      inputField.onkeyup = function() {
        if (inputField.value.length != 0) {
          setTimeout(checkNameAndShowMessage, 1000);
        }
      };
    }
  };

  function checkNameAndShowMessage() {
    if (inputField.value.length == 0) {
      message = "Enter your name";
    } else {
      logins.forEach(function(user) {
        if (inputField.value == user.name) {
          message = "This name is busy";
        }
      });
    }

    if (!outputField) {
      outputField = document.createElement("p");
      inputField.parentNode.insertBefore(outputField, this.nextElementSibling);
      outputField.innerHTML = message;
    } else {
      outputField.innerHTML = message;
    }

    message = "&#10004;";
  }
}

var checkLogin = new CheckLogin(".login");