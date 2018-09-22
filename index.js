const fs = require('fs');
const CSV = require('csv-parse/lib/sync');
const fileContent = fs.readFileSync(`${__dirname}/list-keywords.csv`).toString().split('\n').slice(0, -1).slice(1)
const fileParsed = CSV(fileContent, { delimiter: ';' });

const services = fileParsed.map(row => row[0].replace(/,/g, '')).filter(value => !!value && value !== ',')
const types = fileParsed.map(row => row[1].replace(/,/g, '')).filter(value => !!value && value !== ',')
const qualifications = fileParsed.map(row => row[2].replace(/,/g, '')).filter(value => !!value && value !== ',')
const negatives = fileParsed.map(row => row[3].replace(/,/g, '')).filter(value => !!value && value !== ',')

let fullString = ""

for (let index = 0; index < services.length; index++) {
    const thisService = services[index].toLowerCase();

    for (let index = 0; index < types.length; index++) {
        const thisType = types[index].toLowerCase();

        for (let index = 0; index < qualifications.length; index++) {
            const thisQualification = qualifications[index].toLowerCase();

            fullString += `"${thisService} ${thisType} ${thisQualification}"\n`;
            fullString += `[${thisService} ${thisType} ${thisQualification}]\n`;
            fullString += `+${thisService.replace(/ /g, ' +')} +${thisType.replace(/ /g, ' +')} +${thisQualification.replace(/ /g, ' +')}\n`;

            fullString += `"${thisService} ${thisQualification}"\n`;
            fullString += `[${thisService} ${thisQualification}]\n`;
        }
    }

    const filePath = `./keyword-${thisService}.txt`;

    // Erase the files if exists
    if(fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    // Create a file of each keyword with all keywords of a Service
    fs.writeFileSync(filePath, fullString);
    fullString = ""
}

// Create Negative keyword file
let negativeFullString = ""
for (let index = 0; index < negatives.length; index++) {
    const thisNegative = negatives[index];
    negativeFullString += `-${thisNegative}\n`
}

fs.writeFileSync(`./keywords-0.txt`, negativeFullString);

// Just give some information
console.log('Files Created')
console.log(`Each file has ${local.length * area.length * 5} lines`)
console.log(`You have ${negativas.length} negative keywords`)
