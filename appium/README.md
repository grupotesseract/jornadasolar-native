# Testes com Appium

## Pré requisitos

Instalar o Appium globalmente via npm `npm install -g appium` ou pelo [Aplicativo Desktop](https://github.com/appium/appium-desktop/releases)

Para verificar se todas as dependências do Appium são atendidas, você pode usar o appium-doctor. Instale-o com `npm install -g appium-doctor`, depois execute o comando `appium-doctor`, fornecendo as flags --ios ou --android para verificar se todas as dependências estão configuradas corretamente.

Para android as dependencias necessárias são:

- Node
- Android SDK
- Java
- Path ANDROID_HOME configurado
- Path JAVA_HOME configurado
- Comandos 'adb', 'android' e 'emulator' do android sdk platform tools disponíveis
  - Para rodar os testes não é necessario configurar um emulador, mas o seu smartphone precisa ser encontrado pelo comando adb devices.

Instalar o webdriver no projeto `yarn add webdriverio --dev` ou apenas `yarn install` uma vez que já está no package.json

Instalar a versão mais recente do aplicativo Jornada Solar no smartphone ou emulador.

## Rodando os testes

Execute o servidor do appium com o comando `appium` caso tenha instalado via npm, ou abrindo o app desktop e clicando em Start Server

Execute o script `yarn test:appium` no projeto.

### Observações

Caso ocorra o erro abaixo, altere a versão do android em `platformVersion: '11'` para coincidir com a versão que está usando

```shell
Encountered internal error running command: Error: Unable to find an active device or emulator with OS 11.
```

O teste faz uso das props de testID e AcessibilityLabel, então precisam ser feitos em uma instalação com essa atualização.
