// easter egg :P
console.log(
    "%c👻%cB%cO%cO%cO%cO%cO%cO",
    "font-size: 5vmin;",
    "font-size: 5vmin; color: #222;",
    "font-size: 6vmin; color: #444;",
    "font-size: 7vmin; color: #666;",
    "font-size: 8vmin; color: #888;",
    "font-size: 9vmin; color: #aaa;",
    "font-size: 10vmin; color: #ccc;",
    "font-size: 11vmin; color: #eee;"
  );
  console.log("Please, be nice when checking the code :)");
  
  // cookies
  function changeMode() {
    let mode = "light";
  
    if (document.cookie) {
      const cookies = document.cookie.split(";");
      for (let x = 0; x < cookies.length; x++) {
        if (cookies[x].indexOf("mode=") > -1) {
          const values = cookies[x].split("=");
          mode = values[1];
        }
      };
    }
  
    const newMode = mode === "dark" ? "light" : "dark";
    let date = new Date();
    date.setTime(date.getTime()+2592000000);
    document.cookie =  "mode=" + newMode + "; expires=" + date.toGMTString() + "; path=/";
    document.body.classList.remove(mode);
    document.body.classList.add(newMode);
  }
  
  
  // initiate panel logic only if we are in the home page!
  
  if (document.querySelector("#home-projects")) {
    let focused = 0;
    const section = document.querySelector("#home-projects");
    const tabs = section.querySelectorAll("#home-projects button");
  
    for (let x = 0; x < tabs.length; x++) {
      tabs[x].addEventListener("click", function(e) {
        const newButton = this;
        const oldButton = section.querySelector("button:not([tabindex])");   
        const newPanel = section.querySelector("#"+this.getAttribute("aria-controls"));
        const oldPanel = section.querySelector(".panel:not([hidden])");
  
        focused = parseInt(e.target.id.replace("tab-", "")) - 1;
  
        oldPanel.setAttribute("hidden", "hidden");
        oldPanel.setAttribute("aria-hidden", "true");
        oldPanel.removeAttribute("tabindex");
        oldButton.setAttribute("tabindex", "-1");
        
        newPanel.removeAttribute("hidden");
        newPanel.setAttribute("aria-hidden", "false");
        newPanel.setAttribute("tabindex", "0");
        newButton.removeAttribute("tabindex");
      });
  
      tabs[x].addEventListener("keydown", function(e) {
        let keyName = e.key.toLowerCase();
        if (["arrowright", "right", "arrowdown", "down"].indexOf(keyName) > -1) {
          e.preventDefault();
          focused = ++focused % tabs.length;
          tabs[focused].focus();
          return;
        }
  
        if (["arrowleft", "left", "arrowup", "up"].indexOf(keyName) > -1) {
          e.preventDefault();
          focused--;
          if (focused < 0) { focused = tabs.length - 1; }
          tabs[focused].focus();
          return;
        }
      });
    }
  }
  
  
  // contact form process
  function processForm(e) {
    e.preventDefault();
  
    const cform = document.querySelector("#contact-form");
    const name = cform.querySelector("#name").value;
    const email = cform.querySelector("#email").value;
    const subject = cform.querySelector("#subject").value;
    const message = cform.querySelector("#message").value;
    const amdamdamdmad = cform.querySelector("#amdamdamdmad").value;
    const emptyInfo = cform.querySelector("#empty-info").value;
    const nameError = cform.querySelector("#error-name");
    const emailError = cform.querySelector("#error-email");
    const alertM = document.querySelector("#form-result");
  
    cform.querySelector("#name").classList.remove("error");
    cform.querySelector("#email").classList.remove("error");
    nameError.classList.remove("error");
    emailError.classList.remove("error");
    alertM.classList.remove("error");
    alertM.classList.remove("success");
  
    // show errors if missing required fields
    if(!name) {
      e.preventDefault();
      nameError.classList.add("error");
      cform.querySelector("#name").classList.add("error");
    }
    if(!email) {
      e.preventDefault();
      emailError.classList.add("error");
      cform.querySelector("#email").classList.add("error");
    }
  
    if (name && email) {
      var xhttp = new XMLHttpRequest();
      xhttp.open("POST", "/", true); 
      xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          alertM.classList.remove("error");
          alertM.classList.add("success");
          alertM.innerHTML = "<strong>Success</strong>: The form was submitted correctly.";
          cform.querySelector("#subject").value = "";
          cform.querySelector("#message").value = "";
          alertM.focus();
        } else {
          alertM.classList.add("error");
          alertM.innerHTML = "<strong>Error</strong>: Something failed, please try again later.";
          alertM.focus();
        }
      };
      xhttp.send(`name=${name}&email=${email}&subject=${subject}&message=${message}&amdamdamdmad=${amdamdamdmad}&empty-info=${emptyInfo}&noheader=noheader&submit=submit`);
    }
  }
  if (document.querySelector("#contact-form")) {
    document.querySelector("#contact-form").addEventListener("submit", function(e) {
      processForm(e)
    });
    document.querySelector("#contact-form button").addEventListener("click", function(e) {
      processForm(e)
    });
    document.querySelector("#contact-form #name").addEventListener("blur", function(e) {
      if (this.value !== "") {
        this.classList.remove("error");
        document.querySelector("#error-name").classList.remove("error");
      }
    });
    document.querySelector("#contact-form #email").addEventListener("blur", function(e) {
      if (this.value !== "") {
        this.classList.remove("error");
        document.querySelector("#error-email").classList.remove("error");
      }
    });
  }
  
  /* carousel */
  if (document.querySelector(".cssgames-scroll")) {
    const numProjects = 8;
    let current = 0;
    const scroll = document.querySelector(".cssgames-scroll");
    const container = scroll.querySelector(".cssgames-container");
    const list = scroll.querySelector(".cssgames-list");
    const prev = scroll.querySelector("#prev-project");
    const next = scroll.querySelector("#next-project");
  
    prev.addEventListener("click", function() {
      if (current > 0) {
        current--;
        if (current === 0) {
          prev.setAttribute("disabled", "disabled");
        }
      } else {
        current = 0;
      }
      list.style.transform = `translate(-${current * 12.5}%, 0)`;
      next.removeAttribute("disabled");
    });
  
    next.addEventListener("click", function() {
      if (current < numProjects - 1) {
        current++;
        if (current === numProjects -1) {
          next.setAttribute("disabled", "disabled");
        }
      } else {
        current = numProjects - 1;
      }
  
      list.style.transform = `translate(-${current * 12.5}%, 0)`;
      prev.removeAttribute("disabled");
    });
  
    const links = list.querySelectorAll("a");
    for (let x = 0; x < links.length; x++) {
      links[x].addEventListener("focus", function() {
        list.style.transform = "";
        links[x].scrollIntoView();
        current = x;
        prev.removeAttribute("disabled");
        next.removeAttribute("disabled");
        if (current === 0) { prev.setAttribute("disabled", "disabled"); }
        if (current === numProjects - 1) { next.setAttribute("disabled", "disabled"); }
      })
    }
  }