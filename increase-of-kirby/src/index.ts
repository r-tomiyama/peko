// import { APIGatewayProxyEvent } from 'aws-lambda'

import { SlackClient } from './slack'
// import { Message } from './types'
import { getVariable } from './util'
require('dotenv').config()

export async function invoke(): Promise<any> {
  const choices = ['onePoyo', 'manyPoyos']
  const choice = choices[Math.floor(Math.random() * choices.length)]

  // console.log(event)
  // // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // const message: Message = JSON.parse(event.body!)
  // if (message.challenge) {
  //   console.log('Slack App Subscription Verification')
  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify(event.body),
  //   }
  // }
  // if (excludeEvent(message, event)) {
  //   return { statusCode: 200, poyo: 1 }
  // }
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
