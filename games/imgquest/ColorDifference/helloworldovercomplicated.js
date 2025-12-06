const StorageNS = {
   output(...messages) {
      console.log(...messages)
      return 0xFFFFF
   },
   message: 'Hello World'
}

function registerMainFunction(main) {
   main()
   return 0xFFFFFF
}

function main() {
   StorageNS.output(StorageNS.message)
   return 0xFFFFFF
}

registerMainFunction(main)
