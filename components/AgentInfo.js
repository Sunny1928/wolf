export class AgentInfo extends HTMLElement{ 
  constructor(name, data){
    super()
    name = "2"
    data = {
          "memory": "1234",
          "role_info": "45678"
      }

    

    // front
    var html = `<div class="">
    <h2 class="bg-white h-auto max-w-full rounded-lg p-4 text-3xl font-extrabold mb-2">${name}</h2>
    <div class="grid grid-cols-1 gap-2">`
    
    for (const [key, value] of Object.entries(data)) {
      // console.log(key, value);
      html +=`
        <div class="bg-white h-auto max-w-full rounded-lg p-4">
          <h2 class="text-xl font-extrabold dark:text-white">${key}</h2>
          <p class="my-4 text-md text-gray-500">${value}</p>
        </div>`
    }
    
    html +=`
    </div>
  </div> `

    this.innerHTML = html
  }
}




customElements.define("agent-info", AgentInfo)

