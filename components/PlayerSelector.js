export class PlayerSelector extends HTMLElement{ 
  constructor(data){
    super()

    // front
    var html = `<select name="playerName" id="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">`

    // li
    for (const [key, value] of Object.entries(data)) {
      
      html += `<option value="${value['user_name']}">${value['user_name']}(${value['user_role']})</option>`
    }

    html+=`</select>`

    this.innerHTML = html
  }
}




customElements.define("player-selector", PlayerSelector)

