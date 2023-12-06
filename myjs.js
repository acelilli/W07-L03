fetch("https://striveschool-api.herokuapp.com/books")
  // ricevo il valore in uscita della fetch nel primo then tramite parametro della callback
  .then((responseObj) => {
    // ricevuto un response object da cui posso leggere proprietà OK della risposta
    if (responseObj.ok) {
      // SE procediamo, ritorniamo l'operazione response.json() = Promise a sua volta
      return responseObj.json();
    }
  })
  // THEN che fa aspettare il tempo necessario alla risoluzione del metodo .json() che fa il parse del body della response
  .then((booksObj) => {
    // dentro il parametro di questa callback -> il dato fornito dalle API pronto per essere utilizzato, sicuri di averlo salvato e disponibile
    // Operiamo all'interno di QUESTO contesto
    // Andiamo a utilizzare i dati contenuti nella risposta come meglio vogliamo
    // lancio la funzione che mi genera le cards (DOM manip)
    generateCards(booksObj);
  })
  .catch((error) => {
    // Chiamata quando si verifica un errore nella richiesta
    console.error(error.message);
  });

function generateCards(booksObj) {
  var rowContainer = document.getElementById("cardContainer");
  rowContainer.innerHTML = "";

  if (booksObj && Array.isArray(booksObj)) {
    //cioè itero sui dati e creiamo una card per ogni libro
    booksObj.forEach(function showCard(item) {
      var cardHtml = `
                <div class="col-sm-6 col-md-4 col-lg-3 card-group">
                  <div class="card my-sm-1 my-md-2">
                    <div class="card-body">
                    <img src=${item.img} class="card-img-top object-fit-cover" style="height:300px" alt="book cover">
                      <h6 class="card-title py-2">${item.title}</h5>
                      <p class="card-text">Genre: ${item.category}</p>
                      <p class="card-text blockquote-footer">Price: ${item.price}</p>
                      <button type="button" class="btn btn-danger" onclick="deleteCard(this)">Scarta</button>
                    </div>
                  </div>
                </div>
              `;
      // aggiungo la card al contenitore
      rowContainer.innerHTML += cardHtml;
    });
  }
}

function deleteCard(el) {
  var card = el.closest(".col-md-4");
  //uso closest perché seleziona l'elemento genitore con la classe card
  card.remove();
}
