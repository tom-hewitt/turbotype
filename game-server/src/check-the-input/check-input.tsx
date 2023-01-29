/**
 * checks the key pressed and the value at word[index]
 * index will be increased from where the function is called
 * new word will be generated from where the function is called
 * called at each key press event
 */ 
 function checkInput(key: string, word:string, index:number): boolean {

    if (key === word[index]) {
        return true;
        // will need to increase index from where we call this function
    }
    else {
        return false;
    }

}






