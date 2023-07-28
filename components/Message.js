class MessageGod extends HTMLElement{
  constructor(){
      super()
      
      this.innerHTML = `
        <div class="flex items-center justify-center m-1">
          <div class="relative text-center text-sm bg-blue-100 py-2 px-4 shadow rounded-xl w-full"
          >${this.innerText}
          </div>
        </div>
      `
  }
}

class MessageMe extends HTMLElement{
    constructor(){
        super()
        
        this.innerHTML = `
        <div
          class="flex items-center justify-start flex-row-reverse m-2"
        >
          <div
            class="flex items-center justify-center h-10 w-10 rounded-full bg-gray-300 flex-shrink-0"
          >
            A
          </div>
          <div
            class="relative mr-3 text-left text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
          >
            ${this.innerText}

          </div>
        </div>
        `
    }
}

class MessageOthers extends HTMLElement{
    constructor(){
        super()
        
        this.innerHTML = `
        <div class="flex flex-row items-start m-2">
            <div
            class="flex items-center justify-center h-10 w-10 rounded-full bg-gray-300 flex-shrink-0"
            >
            A
            </div>
            <div class="relative ml-3">
            <p
                class="tracking-wide text-gray-700 text-xs font-bold text-left"
            >
                Sunny
            </p>
            <div
                class="text-left text-sm bg-white py-2 px-4 shadow rounded-xl"
            >
                ${this.innerText}
            </div>
            </div>
        </div>
        
        `
    }
}

customElements.define("message-god", MessageGod)
customElements.define("message-me", MessageMe)
customElements.define("message-others", MessageOthers)

