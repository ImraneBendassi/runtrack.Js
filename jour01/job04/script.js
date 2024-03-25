function bisextile(année) {
    if (année % 4 === 0) {
        if (année % 100 === 0) {
            return année % 400 === 0;
        } else {
            return true;
        }
    } else {
        return false;
    }
}