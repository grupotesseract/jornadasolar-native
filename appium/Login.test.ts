const wdio = require('webdriverio')

jest.setTimeout(60000)
let client

const capabilities = {
  platformName: 'android',
  platformVersion: '11',
  deviceName: 'Nexus5',
  automationName: 'UiAutomator2',
  pkg: 'host.exp.exponent',
  intentAction: 'android.intent.action.VIEW',
  activity: 'host.exp.exponent.experience.HomeActivity',
  appWaitForLaunch: true
}

const options = {
  path: '/wd/hub/',
  port: 4723
}

async function launchExpoAndroid() {
  const client = await wdio.remote({ ...options, capabilities })
  await client.closeApp()
  // Reload to force update
  await client.startActivity(capabilities.pkg, capabilities.activity)
  await client.execute('mobile:deepLink', {
    url: 'exp://192.168.0.106:19000',
    package: capabilities.pkg
  })
  return client
}

describe('Teste de login', () => {
  let client

  beforeAll(async () => {
    client = await launchExpoAndroid()
  })

  afterAll(async () => {
    if (client) {
      await client.deleteSession()
    }
  })

  it('Deve fazer Login e mostrar a saudação', async () => {
    const botaoLogin = await client.$('~botaoLogin')
    await botaoLogin.waitForExist({ timeout: 20000 })
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
})
