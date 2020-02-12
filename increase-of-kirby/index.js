// exports.handler = async (event, context) => {
//   // process 関連の情報を色々出力
//   console.log("process.execPath: ", process.execPath)
//   console.log("process.execArgv: ", process.execArgv)
//   console.log("process.argv: ", process.argv)
//   console.log("process.cwd(): ", process.cwd())
//   console.log("process.mainModule.filename: ", process.mainModule.filename)
//   console.log("__filename: ", __filename)
//   console.log("process.env: ", process.env)
//   console.log("process.getuid(): ", process.getuid())
//   console.log("process.getgid(): ", process.getgid())
//   console.log("process.geteuid(): ", process.geteuid())
//   console.log("process.getegid(): ", process.getegid())
//   console.log("process.getgroups(): ", process.getgroups())
//   console.log("process.umask(): ", process.umask())

//   // 引数の値を出力
//   console.log("event: ", event)
//   console.log("context: ", context)

//   context.callbackWaitsForEmptyEventLoop = false

//   // 実行時間
//   console.log("context.getRemainingTimeInMillis(): ", context.getRemainingTimeInMillis())

//   return context.logStreamName
// }
