class MessageGod extends HTMLElement{
  constructor(text){
      super()

      this.innerHTML = `
        <div class="flex items-center justify-center m-1">
          <div class="relative text-center text-sm bg-blue-100 py-2 px-4 shadow rounded-xl w-full">
            ${text}
          </div>
        </div>
      `
  }
}

class MessageMe extends HTMLElement{
    constructor(id, text){
        super()
        
        this.innerHTML = `
        <div class="flex items-center justify-start flex-row-reverse m-2">
          <div class="flex items-center justify-center h-10 w-10 rounded-full bg-gray-300 flex-shrink-0 bg-color-${id}">
          ${id}
          </div>
          <div class="relative mr-3 text-left text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl whitespace-normal break-all">
            <div>${text}</div>
          </div>
        </div>
        `
    }
}

class MessageOthers extends HTMLElement{
    constructor(item){
        super()
        
        this.innerHTML = `
        <div class="flex flex-row items-start m-2">
            <div class="flex items-center justify-center h-10 w-10 rounded-full bg-gray-300 flex-shrink-0 bg-color-${item.user}">
            ${item.user}
            </div>
            <div class="relative ml-3">
              <p class="tracking-wide text-gray-700 text-xs font-bold text-left">
                ${item.room_user[item.user]}
              </p>

              

              <div
                  class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl whitespace-normal break-all"
              >
                    <div>${item.description} </div>
                    </div>
            </div>
        </div>
        `
    }
}

customElements.define("message-god", MessageGod)
customElements.define("message-me", MessageMe)
customElements.define("message-others", MessageOthers)

export {MessageGod, MessageMe, MessageOthers}
