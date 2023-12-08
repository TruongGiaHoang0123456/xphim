const Experience = (experience) => {

    switch (true) {
        case experience < 10:
            return `${experience}/10`
        case experience < 20:
            return `${experience}/20`
        case experience < 30:
            return `${experience}/30`
        case experience < 40:
            return `${experience}/40`
        case experience < 50:
            return `${experience}/50`
        case experience < 60:
            return `${experience}/60`
        case experience < 70:
            return `${experience}/70`
        case experience < 80:
            return `${experience}/80`
        case experience < 90:
            return `${experience}/90`
        case experience < 100:
            return `${experience}/100`
        default:
            console.log('invalid');
    }
}

export default Experience