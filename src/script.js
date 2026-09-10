class Operation {
    //#region private fields
    #iList; //list of numbers
    #iLength; //length of operation
    #iAnswer; //answer of operation
    #timeBegin; //time when operation started
    #timeEnd; //time when operation ended
    #timeAnswer; //time answer process
    //#endregion

    //#region static fields
    static tmrTimerID = null;
    static iCurrentShowIdx = 0;
    //#endregion

    //constructor
    constructor(object) {
        this.#iList = object.iList || [];
        this.#iLength = object.iLength || 0;
        this.#iAnswer = object.iAnswer || 0;
        this.#timeAnswer = object.timeAnswer || 0;
        this.#timeBegin = object.timeBegin || null;
        this.#timeEnd = object.timeEnd || null;
    }

    //initialize operation
    initialize(rangeValue = [-99, 99]) {
        this.#generateRandomNumbers(rangeValue);
        //alert('Đã tạo xong 1 phép tính! Gía trị: ' + this.#iList);
    }

    //#region properties
    //getters and setters
    get iList() {
        //getter for iList
        return this.#iList;
    }

    get iResult() {
        //getter for iResult
        return this.#sum();
    }

    get iLength() {
        //getter for iLength
        return this.#iLength;
    }
    set iLength(val) {
        //setter for iLength
        this.#iLength = val;
    }

    get iAnswer() {
        //getter for iAnswer
        return this.#iAnswer;
    }
    set iAnswer(val) {
        //setter for iAnswer
        this.#iAnswer = val;
    }

    get timeBegin() {
        //getter for timeBegin
        return this.#timeBegin;
    }
    set timeBegin(val) {
        //setter for timeBegin
        this.#timeBegin = val;
    }

    get timeAnswer() {
        //getter for timeAllowed
        return this.#timeAnswer;
    }
    set timeAnswer(val) {
        //setter for timeAllowed
        this.#timeAnswer = val;
    }

    get timeEnd() {
        //getter for timeEnd
        return this.#timeEnd;
    }
    set timeEnd(val) {
        //setter for timeEnd
        this.#timeEnd = val;
    }
    //#endregion

    //#region private methods
    #generateRandomNumbers(range) {
        //generate random numbers for iList
        let iCounter = 0,
            iSum = 0,
            iNum = 0;
        while (iCounter < this.#iLength) {
            do {
                iNum = this.#generateRandom(range[0], range[1]);
                if (iSum + iNum >= range[0] && iSum + iNum <= range[1]) break;
            } while (true);
            this.#iList.push(iNum);
            iSum = iSum + iNum;
            iCounter++;
        }
    }

    #generateRandom(iMin = 0, iMax = 100) {
        //generate random number
        return Math.floor(Math.random() * (iMax - iMin + 1)) + iMin;
    }

    #sum() {
        //sum of numbers in iList
        let sum = 0;
        this.#iList.forEach((item) => {
            sum += item;
        });
        return sum;
    }
    //#endregion

    //#region public methods
    isCorrect() {
        //check if the result is correct
        return this.#iAnswer === this.iResult;
    }

    convertToText(separator = ' ') {
        //convert iList to string
        let str = '';
        if (this.#iList.length === 0) return str;
        str += `${this.#iList[0]} `;
        for (let i = 1; i < this.#iList.length; i++) {
            if (this.#iList[i] >= 0) str += separator;
            str += `${this.#iList[i]} `;
        }
        return str;
    }

    convertToList(strList, separator = ' ') {
        //convert string to list of numbers
        this.#iList = strList.split(separator).map((item) => parseInt(item));
    }

    toString() {
        //convert object to string
        return (
            this.convertToText(';') +
            `,${this.#iAnswer}, ${this.#timeBegin},${this.#timeEnd}`
        );
    }

    static show(obj, element) {
        element.innerHTML = obj.iList[Operation.iCurrentShowIdx];

        Operation.iCurrentShowIdx++;
        Operation.tmrTimerID = setTimeout(
            Operation.show,
            obj.timeAnswer,
            obj,
            element,
        );
        if (Operation.iCurrentShowIdx >= obj.#iLength) {
            clearTimeout(Operation.tmrTimerID);
            Operation.iCurrentShowIdx = 0;
            return;
        }
    }

    //#endregion
}

class Operations {
    //#region private fields
    #userName; //name of user
    #testDate; //date of test

    #iLengthOfOperation; //length of operation
    #timeAllowed; //time show allowed for operation
    #iRangeValue; //ranges for operation numbers
    #timeElapsed; //time elapsed for operation

    #iLists; //list of numbers for operation
    #iNumOfOperations; //number of operations
    //#endregion

    //#region static fields
    static iShowIdx = 0; //index to current show
    //#endregion

    //constructor
    constructor(object) {
        this.#userName = object.userName || '';
        this.#testDate = object.testDate || new Date();
        this.#iLengthOfOperation = object.iLengthOfOperation || 0;
        this.#iNumOfOperations = object.iNumOfOperations || 0;
        this.#timeAllowed = object.timeAllowed || 0;
        this.#timeElapsed = object.timeElapsed || 0;
        this.#iRangeValue = object.iRangeValue || [-99, 99];

        this.#iLists = object.iLists || [];
    }

    //initialize operation
    initialize() {
        //alert('Bat dau khoi tao Operations!\n');
        for (let i = 0; i < this.#iNumOfOperations; i++) {
            this.#iLists.push(
                new Operation({
                    iList: [],
                    iLength: this.#iLengthOfOperation,
                    timeAnswer: this.#timeAllowed * 1000,
                }),
            );
        }
        /* alert(
            'Da khoi tao xong Operations! Chieu dai iLists: ' +
                this.#iLists.length +
                '\n',
        );*/

        this.#generateOperation();
    }

    //#region properties
    //getters and setters
    get iLists() {
        //getter for iLists
        return this.#iLists;
    }

    get iLengthOfOperation() {
        //getter for iLengthOfOperation
        return this.#iLengthOfOperation;
    }

    get iNumOfOperations() {
        //getter for iNumOfOperations
        return this.#iNumOfOperations;
    }

    get timeAllowed() {
        //getter for timeAllowed
        return this.#timeAllowed;
    }

    get testDate() {
        //getter for testDate
        return this.#testDate;
    }

    set iLengthOfOperation(val) {
        //setter for iLengthOfOperation
        this.#iLengthOfOperation = val;
    }

    set iNumOfOperations(val) {
        //setter for iNumOfOperations
        this.#iNumOfOperations = val;
    }

    set timeAllowed(val) {
        //setter for timeAllowed
        this.#timeAllowed = val;
    }

    set iRangeValue(val) {
        //setter for iRangeValue
        this.#iRangeValue = val;
    }

    set timeElapsed(val) {
        //setter for timeElapsed
        this.#timeElapsed = val;
    }
    //#endregion

    //#region private methods
    #generateOperation() {
        //generate random numbers for operation
        for (let i = 0; i < this.#iNumOfOperations; i++) {
            this.#iLists[i].initialize(this.#iRangeValue);
        }
        /*alert(
            'Đã tạo xong các phép tính! Gia tri cac phep tinh: ' +
                this.convertToText() +
                '\n',
        );*/
    }
    //#endregion

    //#region public methods
    convertToText() {
        //convert iList to string
        let str = '';
        this.#iLists.forEach((item) => {
            str += item.convertToText(' ') + '\n';
        });
        return str;
    }

    toString() {
        //convert object to string
        let str =
            `${this.#userName}, ${this.#testDate}, ${this.#iLengthOfOperation}, ${this.#iNumOfOperations}, ${this.#timeAllowed}, ${this.#timeElapsed}, ${this.#iRangeValue}\n` +
            this.convertToText();
        return str;
    }

    static show(objs, element) {
        //alert('iShowIdx=' + Operations.iShowIdx + '; List=' + objs.iLists);
        document.getElementById('lblDetail').innerHTML =
            objs.#iLists[Operations.iShowIdx];

        //this.#iLists[Operations.iShowIdx].show();
        if (Operation.tmrTimerID == null)
            Operation.show(objs.#iLists[Operations.iShowIdx], element);
    }

    static answer(obj, val) {
        obj.iAnswer = val;
        Operation.tmrTimerID = null;
        return obj.isCorrect();
    }

    /*
    writeToFile() {
        const fs = require('fs');
        const data = `iNumOfOperations: ${this.#iNumOfOperations}, iNumOfCorrectOperations: ${this.#iNumOfCorrectOperations}, timeAllowed: ${this.#timeAllowed}, timeElapsed: ${this.#timeElapsed}, OperationLevel: ${this.#level}\n`;
        fs.appendFile('operations.txt', data, (err) => {
            if (err) throw err;
            console.log('Data has been written to file!');
        });
    }

    readFromFile() {
        const fs = require('fs');
        fs.readFile('operations.txt', 'utf8', (err, data) => {
            if (err) throw err;
            console.log('Data read from file:');
            console.log(data);
        });
    } */

    //#endregion
}

class DataDb {}
