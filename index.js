const TelegramApi = require('node-telegram-bot-api')
const {gameOption, AgainOtions} = requere('./option.js')
const token = '6275364301:AAFdJzoJlkmz28aET-uE-CwctnGa2L6O9Mg'
const bot = new TelegramApi(token,{polling: true})

const chats = {}

const startGame = async (chatId) => {
  await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать!')
  const randomNumeber = Math.floor(Math.random() * 10)
  chats[chatId] = randomNumeber
  await bot.sendMessage(chatId, 'Отгадывай', gameOptions)
}

const start = () => {
  bot.setMyCommands([
    {command: '/start', description: 'Начальная приветствие'},
    {command: '/info', description: 'Получит информацию о ползователе'},
    {command: '/game', description: 'Игра угадай цифру'},
  ])

  bot.on('message', async msg =>{
    const text= msg.text
    const chatId = msg.chat.id
    if (text === '/start') {
      return bot.sendMessage(chatId, 'Добро пожаловать в телеграм бот elnuranvarbek')
    }
    if (text === '/info') {
      return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`)
    }
    if (text === '/game') {
      return startGame(chatId)
    }
    return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз')
  })
  bot.on('callback_query', msg => {
    const data = msg.data
    const chatId = msg.message.chat.id
    if (data === '/again') {
      return startGame(chatId)
    }
    if (data === chats[chatId]) {
      return bot.sendMessage(chatId,`Поздравляю ты отгодал цифру ${chats[chatId]}`, aginOptions)
    } else {
      return bot.sendMessage(chatId, `Ты не угодал, бот загадал цифру ${chats[chatId]}`, aginOptions)
    }
  })
}

start()