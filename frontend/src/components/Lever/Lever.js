
function Lever(number) {
    switch (true) {
        case number < 10:
            return 'Cấp 1';
        case number < 100:
            return 'Cấp 2';
        case number < 1000:
            return 'Cấp 3';
        case number < 10000:
            return 'Cấp 4';
        case number < 100000:
            return 'Cấp 5';
        case number < 1000000:
            return 'Cấp 6';
        case number < 10000000:
            return 'Cấp 7';
        default:
            return 'Cấp null';
    }

}

export default Lever