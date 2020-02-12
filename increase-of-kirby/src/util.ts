import { APIGatewayProxyEvent } from 'aws-lambda'

import { Message } from './types'

export function getVariable(key: string): string {
  const variable = process.env[key]
  if (!variable) throw new Error(`環境変数'${key}'が取得できませんでした`)
  return variable
}

export function excludeEvent(message: Message, event: APIGatewayProxyEvent): boolean {
  if (
    event.headers['X-Slack-Retry-Reason'] &&
    event.headers['X-Slack-Retry-Reason'] === 'http_timeout'
  ) {
    console.log('Slack API 側のタイムアウトによるリトライは除外')
    console.log({ headers: event.headers })
    return true
  }

  if (message.event.bot_id == process.env.BOT_ID) {
    console.log(`自分には反応しないように除外(bot_id: ${message.event.bot_id})`)
    return true
  }

  if (message.event.type !== 'message') {
    console.log('メッセージ以外は除外')
    return true
  }

  if (!message.event.text.includes(':kirby:')) {
    console.log('カービィ絵文字を含まない場合は除外')
    return true
  }

  return false
}
