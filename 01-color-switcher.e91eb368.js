!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),r=document.body;function a(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16));r.style.backgroundColor=t}t.addEventListener("click",(function(t){timerId=setInterval(a,1e3),t.target.setAttribute("disabled",!0),e.removeAttribute("disabled")})),e.addEventListener("click",(function(e){clearInterval(timerId),e.target.setAttribute("disabled",!0),t.removeAttribute("disabled")})),e.setAttribute("disabled",!0)}();
//# sourceMappingURL=01-color-switcher.e91eb368.js.map
