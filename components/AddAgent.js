export class AddAgent extends HTMLElement{ 
  constructor(test = 1){
    super()

    // front
    var html = `<div class="col-start-1 col-end-13 rounded-lg">
    <div class="flex items-center justify-center m-1">
      <div class="font-semibold relative text-center text-sm bg-blue-100 py-2 px-4 shadow rounded-xl w-full">
        <div class="">
          <h2 class="text-md font-extrabold dark:text-white my-1">Add Agent</h2>`
          
          if(test == 1){
            html+='<button class="addPlayer text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Player</button>'
          }
    html+= `
          <button class="addIntelligentAgent text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Intelligent Agent</button>
          <button class="addMemmoryAgent text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Memory Agent</button>
        </div>
      </div>
    </div>
  </div>`

    this.innerHTML = html
  }
}




customElements.define("add-agent", AddAgent)

