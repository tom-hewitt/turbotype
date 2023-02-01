/**
 * 
 * @param key pressed key
 * @param word new word will be generated from where the function is called
 * @param index will be increased from where the function is called
 * @returns boolean
 */
export function checkInput(key: string, word: string, index: number): boolean {
    return key === word[index];
}






