

const Main = {

tasks:[],

    init: function(){

        this.cacheSelectors()
        this.bindEvents()
        this.gitStorage()
        this.construirTasks()    
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
            butons.addEventListener("click", self.Events.checkbutton_click)})

        this.$listaDtarefas.addEventListener("keypress" , this.Events.listaDtarefas_click.bind(this))

        this.$removeButtons.forEach(function(butons){
            butons.addEventListener("click",  self.Events.removeButtons_click)})

        },

    gitStorage: function(){

            const localS = localStorage.getItem("kapspai")
            this.tasks = JSON.parse(localS)
        
        },

    construirTasks: function(){ 
        let html = ""

        this.tasks.forEach(function(iten){
            
            html  += `
            <li>
            <div class="check"></div> 
            <label class="task">${iten.kaps}</label>
            <button class="remove"></button>
            </li>`       
            
        })
        this.$addLista.innerHTML = html 
        this.cacheSelectors()
        this.bindEvents()
    
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
                
                this.$addLista.innerHTML += ` 
                <li>
                <div class="check"></div> 
                <label class="task">${valor}</label>
                <button class="remove"></button>
                </li>`      

                const save = localStorage.getItem("kapspai")
                const saveobjeto = JSON.parse(save)

                const obj = [{kaps:valor}, ...saveobjeto]  
                localStorage.setItem("kapspai", JSON.stringify(obj))

        }
        this.cacheSelectors()
        this.bindEvents()
        e.target.value= ""

    
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

