const Main = {

    init: function(){
              
        this.cacheSelectors()
        this.bindEvents()
    },

    cacheSelectors: function(){
        this.$checkbuttons = document.querySelectorAll(".check")
        this.$listaDtarefas = document.querySelector("#inputTask")
        this.$addLista = document.querySelector(".list")
        this.$removeButtons = document.querySelectorAll(".remove")
    },
   
    bindEvents: function(){
        const self = this
 
        this.$checkbuttons.forEach(function(butons){
            butons.addEventListener("click", self.Events.checkbutton_click)

        })

        this.$listaDtarefas.addEventListener("keypress" , this.Events.listaDtarefas_click.bind(this))

        this.$removeButtons.forEach(function(butons){
            butons.addEventListener("click",  self.Events.removeButtons_click)

        })


        },

     Events: {
        checkbutton_click: function(e){
            const li = e.target.parentElement //caminho para encontrar a minha li
//contains: verifica se a variavel ja tem ou nao um valor expecifico
            const done = li.classList.contains("done")
                if(done == false){
            return li.classList.add("done")
            }
            li.classList.remove("done")
            
        },
//o this dentro de um evento, seja de click ou qualquer outro
// ele sempre vai ser o proprio elemento que vc adicionou o evento
// como evitar isso? :precisa ser passado na hora de chmar a funçao o : bind(this)
        listaDtarefas_click: function(e){
            const valor = e.target.value
            const tecla = e.key
     
            if (tecla == "Enter") { 
                
                if(valor.length > 0){
                const mostrarTarefas = ` 
                <li>
                <div class="check"></div> 
                <label class="task">${valor}</label>
                <button class="remove"></button>
                </li>`       
                
                this.$addLista.innerHTML += mostrarTarefas 
    
                        }


                     this.cacheSelectors()
                     this.bindEvents()
                     return   e.target.value= ""
        
    }
     
   
},


        removeButtons_click: function(e){
        const li = e.target.offsetParent
      
         li.classList.add("animation")

       setTimeout( function(){ 
        li.classList.add("removed")
       },300)
        
        

    }
}}


Main.init()


