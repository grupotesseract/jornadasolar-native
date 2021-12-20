const wdio = require('webdriverio')

jest.setTimeout(60000)
let client

beforeAll(async () => {
  client = await wdio.remote({
    path: '/wd/hub',
    port: 4723,
    capabilities: {
      platformName: 'Android',
      platformVersion: '8',
      deviceName: 'Nexus5',
      appPackage: 'com.grupotesseract.jornadasolar',
      appActivity: 'host.exp.exponent.MainActivity',
      appWaitForLaunch: true,
      automationName: 'UiAutomator2'
    }
  })
})

afterAll(async () => {
  if (client) {
    await client.deleteSession()
  }
})

test('Login', async () => {
  const botaoLogin = await client.$('~botaoLogin')
  await botaoLogin.waitForExist({ timeout: 10000 })
  await botaoLogin.click()

  const email = await client.$('~inputEmail')
  await email.waitForExist({ timeout: 5000 })
  const senha = await client.$('~inputSenha')
  await email.setValue('thais.marpi@gmail.com')
  await senha.setValue('qweasd')

  const botaoEntrar = await client.$('~botaoEntrar')
  await botaoEntrar.click()

  const saudacao = await client.$('~saudacao')
  await saudacao.waitForExist({ timeout: 10000 })

  expect(saudacao).toBeTruthy()
})
