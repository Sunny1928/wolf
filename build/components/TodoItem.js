const template = document.createElement("template")
template.innerHTML =`

 <label class="text-purple-800">
     <input type="checkbox" /> 
     <slot> </slot> 
     <span class="description"> 
        <slot name= "description" ></slot> 
    </span> 
</label>
`
class TodoItem extends HTMLElement {
    constructor () {
        super ()
        const shadow = this.attachShadow ({ mode: "open" })
        shadow.append (template.content. cloneNode (true))
    }
}
customElements.define("todo-item", TodoItem)