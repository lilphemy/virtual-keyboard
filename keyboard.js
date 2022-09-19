const keyboard = {

    elements: {
        main: null,
        keyContainer: null,
        keys: [],
    },

    eventHandlers: {
        oninput: null,
        onclose: null,
    },

    properties: {
        value: "",
        capLocks: false,
    },

    init() {

        // create main element

        this.elements.main = document.createElement("div");
        this.elements.keyContainer = document.createElement("div");

        //setup classes for keyboard main elements

        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keyContainer.classList.add("keyboard_keys");
        this.elements.keyContainer.appendChild(this._createKeys());
        this.elements.keys = this.elements.keyContainer.querySelectorAll(".keyboard_key");

        //add to DOM list

        this.elements.main.appendChild(this.elements.keyContainer);
        document.body.appendChild(this.elements.main);


        // to use keyboard with the input field area on the screen;

        document.querySelectorAll(".use--keyboard").forEach((element) => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                }, )
            })
        });

        // document.querySelector(".use--keyboard").addEventListener("focus", (e) => {
        //     this.open(e.value, currentValue => {
        //         e.value += currentValue;
        //     })
        // })
    },

    _createKeys() {

        let fragmentScale = document.createDocumentFragment();

        const keyBlocks = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",  "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "'", "?",
            "space"
        ];

        //create icon HTML 

        const createIconHTML = function (icon_name){
            return `<span class = material-symbols-outlined >${icon_name}</span>`
        }
        const createMainHTML = function (html_name) {
            return `<p>${html_name}</p>`;
        }


        keyBlocks.forEach((key) =>{

            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

            //add attributes and classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard_key");

            switch(key){

                case "backspace":
                    keyElement.classList.add("keyboard_key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");
                    keyElement.addEventListener("click", ()=> {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                        //return this.properties.value;
                    })
                break;

                case "caps":
                    keyElement.classList.add("keyboard_key--wide", "keyboard_key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");
                    keyElement.addEventListener("click", ()=> {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard_key--active", this.properties.capLocks)
                    })
                break;

                case "enter":
                    keyElement.classList.add("keyboard_key--wide");
                    keyElement.innerHTML = createIconHTML("Keyboard_return");
                    keyElement.addEventListener("click", ()=> {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    })
                break;

                case "space":
                    keyElement.classList.add("keyboard_key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");
                    keyElement.addEventListener("click", ()=> {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    })
                break;

                case "done":
                    keyElement.classList.add("keyboard_key--wide", "keyboard_key--dark");
                    keyElement.innerHTML = createIconHTML("task_alt");
                    keyElement.addEventListener("click", ()=> {
                        this.close();
                        this._triggerEvent("onclose");
                    })
                break;

                default:
                    keyElement.innerText = key.toLowerCase();
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capLocks ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });
                    
            }

            fragmentScale.appendChild(keyElement);

            if(insertLineBreak) {
                fragmentScale.appendChild(document.createElement("br"));
            }
        });

        return fragmentScale;
    },

    _triggerEvent(handlerName) {
        if(typeof this.eventHandlers[handlerName] == "function"){
            this.eventHandlers[handlerName](this.properties.value)
        }
        //console.log("Event triggered! Event name:" + handlerName);
    },

    _toggleCapsLock() {
        this.properties.capLocks = !this.properties.capLocks;
        for (const keys of this.elements.keys){
            if(keys.childElementCount === 0){
                keys.innerText = this.properties.capLocks ? keys.textContent.toUpperCase() : keys.innerText.toLowerCase();
            }
        }
        console.log("Caps Lock Toggle");
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
    //    const textBlock = document.getElementById("textblock");
    //    textBlock.focus();
       this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.onclose = onclose;
        this.eventHandlers.oninput = oninput;
        this.elements.main.classList.add("keyboard--hidden");
    }
}

window.addEventListener("DOMContentLoaded", function () {

    keyboard.init();

})

// keyboard.open("lilphemy", function(staticValue) {
    //     console.log("the static value is " + staticValue);
    // }, function(staticValue) {
    //     console.log("keyboard closed, value is " + staticValue);
    // })

// KeyElement.innerHTML = key.toLowerCase();
//                     keyElement.addEventListener("click", ()=> {
//                         this.properties.value += this.properties.capLocks ? key.toUpperCase() : key.toLowerCase();
//                         this._triggerEvent("oninput");
//                         //console.log(keyElement);
//                     });