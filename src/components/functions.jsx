export function getReadPile() {
    let readPile = [];
    try {
        readPile = JSON.parse(localStorage.getItem('readPile'));
    } catch(error) {
        return [];
    } 
    return readPile;
}

export function setReadPile(x) {
    localStorage.setItem('readPile', JSON.stringify(x));
}

export function getCompleted() {
    let completed;
    try {
        completed = JSON.parse(localStorage.getItem('completed'));
    } catch(error) {
        return [];
    } 
    return completed;
}
// I am not adding semi-colons in my jS-code from now on.
export function setCompleted(x) {
    localStorage.setItem('completed', JSON.stringify(x))
}

export function addToReadPile(book) {
    let readPile = getReadPile()
    let newReadPile;
    if(readPile !== null) 
        newReadPile = [...readPile, book]

    else newReadPile = [book]
    console.log ('Added to readpile');
    setReadPile(newReadPile)
}

export function addtoCompleted(book) {
    let completed = getCompleted()
    let newCompleted;    
    if(completed !== null) newCompleted = [...completed, book]
    else newCompleted = [book]
    setCompleted(newCompleted)
}

export function deletefromReadPile(toDel) {
    let readPile = getReadPile()
    // Have to use bookID or name here but since both are strings, it will work. 
    let newReadPile = readPile.filter(book => book.id !== toDel.id)
    setReadPile(newReadPile)
}

export function deletefromCompleted(toDel) {
    let completedlist = getCompleted()
    let newCompleted = completedlist.filter(book => book.id !== toDel.id)
    setCompleted(newCompleted)
}