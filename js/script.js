
    //Prism.highlightAll(); // This works!

    // Kata class: creates a new Kata

    class Kata {
        constructor(title, url, yourSolution, altSolution) {
            this.title = title;
            this.url = url;
            this.yourSolution = yourSolution;
            this.altSolution = altSolution;
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
          const h3 = document.createElement('h3');
          h3.textContent = kata.title;
          const i = document.createElement('i');
          i.className = "far fa-trash-alt delete";
          div.append(h3,i);
          const sideBar = document.querySelector('.katas-side-menu');
          sideBar.append(div);

        }

        static deleteKata() {

        }

        static showAlert(message, className) {
            let div = document.createElement('div');
            div.classList.add('alert',className);
            let text = document.createTextNode(message);
            div.appendChild(text);
            document.querySelector('#kata-form').prepend(div)

            setTimeout(()=> {
                document.querySelector('.alert').remove();
            },3000)
        }

        static showKataDetails() {

        }

        static clearFields() {

        }

    }

   //Store class: Handels all tasks with local storage

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
    }

    
    // Event: Add a book

    document.querySelector('#kata-form').addEventListener('submit', (ev) => {
        ev.preventDefault();
        const title = document.querySelector('#kata-name').value;
        const url = document.querySelector('#kata-url').value;
        const yourSolution = document.querySelector('#kata-solution').value;
        const altSolution = document.querySelector('#alt-kata-solution').value;

        if(title === "" || url === "" || yourSolution === "" || altSolution === "") {
            UI.showAlert("Please fill in all the fields","danger");
        } else {
            const kata = new Kata(title, url, yourSolution,altSolution);
            UI.addToCollection(kata);
            Store.storeKata(kata);
        }

    })

    document.addEventListener('DOMContentLoaded',UI.displayKatas)