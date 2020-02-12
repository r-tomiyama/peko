import { SlackClient } from './slack'
import { getVariable } from './util'
require('dotenv').config()

export async function invoke(): Promise<any> {
  const choices = ['onePoyo', 'manyPoyos']
  const choice = choices[Math.floor(Math.random() * choices.length)]

  return { statusCode: 200, choice }
}

export async function poyo(): Promise<any> {
  const token = getVariable('TOKEN')
  const slackClient = new SlackClient(token)

  await slackClient.postMessage({
    channel: getVariable('CHANNEL_ID_SANDBOX'),
    text: ':kirby:',
    username: 'kirby',
  })
  return { statusCode: 200 }
}

export async function errorNotification(): Promise<any> {
  const token = getVariable('TOKEN')
  const slackClient = new SlackClient(token)

  await slackClient.postMessage({
    channel: getVariable('CHANNEL_ID_SANDBOX'),
    text: '失敗したよ',
    username: 'errorNotification',
  })
  return { statusCode: 200 }
}
