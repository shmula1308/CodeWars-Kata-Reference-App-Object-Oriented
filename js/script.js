
    //Prism.highlightAll(); // This works!

    // Kata class: creates a new Kata
    
    class Kata {
        constructor(title, url, yourSolution, altSolution,timestamp) {
            this.title = title;
            this.url = url;
            this.yourSolution = yourSolution;
            this.altSolution = altSolution;
            this.timestamp = timestamp;
        }
    }

    //UI class: Handles all interface related tasks

    class UI {
        static displayKatas() {
            let katas = Store.getKata();
            console.log(katas)
            katas.forEach(kata => {
                UI.addToCollection(kata);
            })
        }

        static addToCollection(kata) {
          const div = document.createElement('div');
          div.className = "kata";
          div.dataset.timestamp = kata.timestamp;
          const h3 = document.createElement('h3');
          h3.textContent = kata.title;
          const i = document.createElement('i');
          i.className = "far fa-trash-alt delete";
          div.append(h3,i);
          const sideBar = document.querySelector('.katas-side-menu');
          sideBar.append(div);

        }

        static deleteKata(ev) {
            ev.target.parentNode.remove();
        }

        static showAlert(message, className) {
            let div = document.createElement('div');
            div.classList.add('alert',className);
            let text = document.createTextNode(message);
            div.appendChild(text);
            document.querySelector('#kata-form').prepend(div)

            setTimeout(()=> {
                document.querySelector('.alert').remove();
            },2000)
        }

        static showKataDetails() {
            document.querySelector('.store-kata-page').style.display = 'none';
            document.querySelector('.display-kata-page').style.display = 'block';
        }

        static clearFields() {
            document.querySelector('#kata-form').reset();
        }

        static addActiveClass(el) {
            let kataCollection = document.querySelectorAll('.kata');
            Array.from(kataCollection).forEach(kata => kata.classList.remove('selected-kata'));
            el.classList.add('selected-kata');
        }

    }

   //Store class: Handles all tasks with local storage

    class Store {
        static getKata() {
            let katas;
            if(localStorage.getItem('kata') === null) {
                katas = [];
            } else {
                katas = JSON.parse(localStorage.getItem('kata'));
            }
            
            return katas;
        }
        static storeKata(kata) {
            let katas = Store.getKata();
            katas.push(kata)
            localStorage.setItem('kata', JSON.stringify(katas))
        }

        static removeKata(kata) {
           let id = kata.getAttribute("data-timestamp");
           let katas = Store.getKata();
           
           katas = katas.filter(kata => kata.timestamp != id);
           localStorage.setItem('kata', JSON.stringify(katas));
        }
    }

    
    // Event: Add a book

    document.querySelector('#kata-form').addEventListener('submit', (ev) => {
        ev.preventDefault();
        const title = document.querySelector('#kata-name').value;
        const url = document.querySelector('#kata-url').value;
        const yourSolution = document.querySelector('#kata-solution').value;
        const altSolution = document.querySelector('#alt-kata-solution').value;
        const timestamp = Date.now();
       
        

        if(title === "" || url === "" || yourSolution === "" || altSolution === "") {
            UI.showAlert("Please fill in all the fields","danger");
        } else {
            const kata = new Kata(title, url, yourSolution,altSolution,timestamp);
            UI.addToCollection(kata);
            Store.storeKata(kata);
            UI.showAlert('Kata added to collection', 'success');  
            UI.clearFields();
        }
    })

    // Event: Pull items from storage and add to list when page loads

    document.addEventListener('DOMContentLoaded',UI.displayKatas);

    // Event: Delete book
    
    document.querySelector('.katas-side-menu').addEventListener('click',(ev) => {
        if(ev.target.classList.contains('delete')) {
            UI.deleteKata(ev);
            Store.removeKata(ev.target.parentNode);
            UI.showAlert("Kata removed from collection", "success");
        } else {
            return;
        }
        
    });

    // Event: Show Kata Solutions 

    document.querySelector('.katas-side-menu').addEventListener('click',(ev) => {
            UI.showKataDetails(ev.target.closest('div.kata'));
            UI.addActiveClass(ev.target.closest('div.kata'));
    })


