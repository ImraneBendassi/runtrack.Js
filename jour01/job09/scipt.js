function tri(numbers, order) {
    
    if (order !== 'asc' && order !== 'desc') {
        console.error('Le paramètre "order" doit être "asc" ou "desc".');
        return;
    }

    
    if (order === 'asc') {
        return numbers.sort((a, b) => a - b);
    } else { // order === 'desc'
        return numbers.sort((a, b) => b - a);
    }
}


const numbersAsc = [5, 2, 8, 1];
const numbersDesc = [5, 2, 8, 1];

console.log(tri(numbersAsc, 'asc')); 
console.log(tri(numbersDesc, 'desc')); 