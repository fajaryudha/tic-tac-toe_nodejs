const readline = require('readline');

class TicTacToe {
    constructor() {
        // initiate variables
        this.board = '';
        this.number = [];
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    async startGame() {
        console.log('Player 1, Chose number [1-9]');

        await this.rl.on("line", (input) => {
            this.logic(input);
        })

        await this.displayBoard();
    };
    displayBoard() {
        this.board = ` ${this.logicNumber(this.number[0])} | ${this.logicNumber(this.number[1])} | ${this.logicNumber(this.number[2])} \n-----------\n ${this.logicNumber(this.number[3])} | ${this.logicNumber(this.number[4])} | ${this.logicNumber(this.number[5])} \n-----------\n ${this.logicNumber(this.number[6])} | ${this.logicNumber(this.number[7])} | ${this.logicNumber(this.number[8])} \n`;
        console.log(this.board)
    }

    logic(number) {
        if (number > 9) {
            console.log('Number chose 1 - 9');
            process.exit();
        }

        if (!this.number[number - 1]) {
            this.number[number - 1] = 'X';
        }

        this.aiLogic();
        this.displayBoard();
        this.winGame();
    }

    logicNumber(number) {
        if (!number) {
            return ' ';
        }
        return number;
    }

    aiLogic() {
        let arrAi = [];
        for (let i = 0; i < 9; i++) {
            if (!this.number[i]) {
                arrAi.push(i)
            }
        }
        let rnd = this.getRandomItem(arrAi);
        this.number[rnd] = 'O';
    }

    getRandomItem(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        const item = arr[randomIndex];
        return item;
    }

    winGame() {
        let arrayInv = [];
        let arrayAi = [];
        let arrayToWin = [[0, 4, 8], [2, 4, 6], [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [2, 4, 7], [2, 5, 8]]
        let statusWin = [];
        for (let i = 0; i < this.number.length; i++) {
            if (this.number[i] == 'X') {
                arrayInv.push(i);
            } else if (this.number[i] == 'O') {
                arrayAi.push(i);
            }
        }
        arrayInv.sort();
        for (const v of arrayToWin) {
            let statusWin = this.arr_diff(v, arrayInv);
            let aiWin = this.arr_diff(v, arrayInv);

            if (aiWin.length == 0) {
                console.log('Player 1 Menang')
                process.exit()
            }

            if (statusWin.length == 0) {
                console.log('Player 1 Menang')
                process.exit()
            }
        }
    }

    arr_diff(a1, a2) {
        var a = [], diff = [];

        for (var i = 0; i < a1.length; i++) {
            a[a1[i]] = true;
        }

        for (var i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]];
            } else {
                a[a2[i]] = true;
            }
        }

        for (var k in a) {
            diff.push(true);
        }

        return diff;
    }
}

new TicTacToe().startGame();
