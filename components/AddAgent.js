export class AddAgent extends HTMLElement{ 
  constructor(test = 1){
    super()

    // front
    var html = `<div class="col-start-1 col-end-13 rounded-lg">
    <div class="flex items-center justify-center m-1">
      <div class="font-semibold relative text-center text-sm bg-gray-800 text-white py-4 px-2 shadow rounded-xl w-full">
        <div class="">
          <h2 class="text-md font-extrabold my-1">Add Agent</h2>`
          
          if(test == 1){
            html+='<button class="addPlayer text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-4 py-2 text-center m-1">Player</button>'
          }
    html+= `
          <button id="simple_agent" agent-name="simAgent" class="addAgent text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-4 py-2 text-center m-1">SimAgent</button>
          <button id="intelligent_agent" agent-name="iAgent" class="addAgent text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-4 py-2 text-center m-1">iAgent</button>
          <button id="memory_stream_agent" agent-name="mAgent" class="addAgent text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-4 py-2 text-center m-1">mAgent</button>
          <button id="summary_intelligent_agent" agent-name="iAgentS" class="addAgent text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-4 py-2 text-center m-1">iAgent w/ Summary</button>
          <button id="summary_memory_stream_agent" agent-name="mAgentS" class="addAgent text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-4 py-2 text-center m-1">mAgent w/ Summary </button>
          </div>
      </div>
    </div>
  </div>`

    this.innerHTML = html
  }
}




customElements.define("add-agent", AddAgent)

