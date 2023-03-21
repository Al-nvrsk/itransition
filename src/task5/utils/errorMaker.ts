import { RegionType } from "../types/types";

const  alphabet = {
    en : 'abcdefghijklmnopqrstuvwxyz',
    ru : 'абвгдеёзжиклмнопрстуфхцчшщъыьэюя',
    cz : 'aábcčdďeéěfghchiíjklmnňoópqrřsštťuúůvwxyýzž',
    es : 'abcdefghijklmnñopqrstuvwxyz'
}    
    
    const deleteChar = (str: string) => {
        const index = Math.floor(Math.random() * str.length);
        return str.slice(0, index) + str.slice(index + 1);
    }

    const  insertChar = (str: string, region: RegionType) => {
        const index = Math.floor(Math.random() * (str.length + 1));
        const charIndex = Math.floor(Math.random() * alphabet[region].length);
        const char = alphabet[region][charIndex];
        return str.slice(0, index) + char + str.slice(index);
    }

    const swapChars = (str: string) => {
        const index = Math.floor(Math.random() * (str.length - 1));
        return str.slice(0, index) + str[index + 1] + str[index] + str.slice(index + 2);
    }

    const errorArr = [deleteChar, insertChar, swapChars]

    export function getRandomArrIndex(arrLength: number) {
        return Math.floor(Math.random() * arrLength);
    }

    export const errorMaker = (value: string, errorsCount: number, region: RegionType) => {
        for( let i=0; i<errorsCount; i++) {
            const changedErrIndex = getRandomArrIndex(errorArr.length)
            value = errorArr[changedErrIndex](value, region)
        }
    return value
}
