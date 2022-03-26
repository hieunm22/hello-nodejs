const { mainModule } = require("process");

const handler = ({ a, b }) => a + b

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const readlineAsyncA = () => new Promise((res, rej) => {
  rl.on("line", line => res(line))
})

const readlineAsyncB = () => new Promise((res, rej) => {
  rl.on("line", line => res(line))
})

async function recursiveReadline() {
  while (true) {
    const strA = await readlineAsyncA()
    const strB = await readlineAsyncB()
    console.log('strA :>> ', strA);
    console.log('strB :>> ', strB);
    const a = Number(strA)
    const b = Number(strB)
    console.log('a + b :>> ', handler({ a, b}));
  }
}


class TPCHandler {
  constructor() {
    // this.port = 3000
  }

  onReceiveMessage(msg, handler) {
    return handler(msg)
  }
}

async function main() {
  const tcp = new TPCHandler()
  while (true) {
    await tcp.onReceiveMessage("msg", handler)
  }
}

main()