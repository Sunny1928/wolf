export class AddAgent extends HTMLElement{ 
  constructor(){
    super()

    // front
    var html = `<div class="col-start-1 col-end-13 rounded-lg">
    <div class="flex items-center justify-center m-1">
      <div class="font-semibold relative text-center text-sm bg-blue-100 py-2 px-4 shadow rounded-xl w-full">
        <div class="">
          <h2 class="text-md font-extrabold dark:text-white my-1">Add Agent</h2>
          <button class="addIntelligentAgent text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Intelligent Agent</button>
          <button class="addMemmoryAgent text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Memory Agent</button>
        </div>
      </div>
    </div>
  </div>`

    this.innerHTML = html
  }
}




customElements.define("add-agent", AddAgent)

