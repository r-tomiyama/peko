import { APIGatewayProxyEvent } from 'aws-lambda'

import { SlackClient } from './slack'
import { Message } from './types'
import { getVariable } from './util'
require('dotenv').config()

export async function executeSF(event: APIGatewayProxyEvent): Promise<any> {
  const message: Message = event.body && JSON.parse(event.body)
  console.log(message)

  const request = require('request') // eslint-disable-line
  const dataString = `{"input": "{}","stateMachineArn": "${getVariable('SF_ARN')}"}`
  const options = {
    url: getVariable('SF_PATH'),
    body: dataString,
  }
  function callback(error: any, response: any, body: any) {
    if (!error && response.statusCode == 200) {
      console.log(body)
    }
  }

  request.post(options, callback)
  return {
    statusCode: 200,
  }
}

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
