const en = {
  nomeApp: 'Solar Journey',
  errosAuth: {
    emailInvalido: 'Invalid email',
    emailJaCadastrado: 'Email already in use',
    senhaFraca: 'Password must be at least 6 characters long',
    senhaErrada:
      'Incorrect password. Try again or click "Forgot password?" to reset it',
    emailNaoEncontrado: 'User not found',
    linkExpirado:
      'The link to reset your password has expired. Click "Forgot password?" to ask for a new link'
  },
  login: {
    saudacao: 'Hi! Good to see you here',
    email: 'Email',
    senha: 'Password',
    entrar: 'Sign In',
    esqueciSenha: 'Forgot password?'
  },
  home: {
    comecarJornada: 'Start Journey',
    tenhoCadastro: 'I have an account',
    versao: 'version',
    frase:
      'Embark on a journey of self-awareness and monitor your habits and emotions'
  },
  cadastro: {
    parabens: 'Hello! Congratulations on starting your journey',
    perguntaNome: 'For starters, what would you like to be called?',
    continuar: 'Continue',
    prazerConhecer: 'Nice to meet you, %{nome}!',
    perguntaObjetivos: 'What are your main goals?',
    objetivos: {
      autoconhecimento: 'Self-awareness',
      habitos: 'Monitoring habits',
      emocoes: 'Monitoring emotions',
      escrever: 'Write about my day',
      outros: 'Other'
    },
    vamosAjudar: `Cool, let's help you with that!`,
    perguntaSentimentos: 'How are you feeling right now?',
    perguntaHabitos: 'What did you do today?',
    faltaUmPasso: 'Just one more step!',
    crieCadastro: 'Create an account and save your data',
    email: 'Email',
    senha: 'Password',
    perguntaLivro: 'Do you have the Solar Journey book?',
    opcoesLivro: {
      TemLivro: 'Yes, I have it!',
      NaoTemLivro: `I don't`,
      QueroSaberMais: 'No, but I want to know more'
    },
    pronto: 'Pronto!'
  },
  recuperarSenha: {
    titulo: "Oops, let's fix that",
    enviaremosLink:
      'We will send you a link by email to create a new password.',
    linkEnviado:
      'A link to reset your password has been sent to %{email}, please check your inbox or spam folder.',
    enviar: 'Send'
  },
  menuInferior: {
    registros: 'Entries',
    graficos: 'Charts',
    meditacoes: 'Meditations'
  },
  diario: {
    bomDia: 'Good Morning',
    boaTarde: 'Good Afternoon',
    boaNoite: 'Good evening',
    mensagem: {
      inicio: 'Today the ',
      sol: 'Sun',
      final:
        'is in the sign of %{signo} and the Moon is in its %{faseDaLua} phase.'
    },
    perfil: 'Profile',
    sentimentos: 'Fill in feelings',
    habitos: 'Fill in habits',
    anotacoes: 'Write about your day',
    verMais: 'More'
  },
  signos: {
    capricornio: 'Capricorn',
    aquario: 'Aquarius',
    peixes: 'Pisces',
    aries: 'Aries',
    touro: 'Taurus',
    gemeos: 'Gemini',
    cancer: 'Cancer',
    leao: 'Leo',
    virgem: 'Virgo',
    libra: 'Libra',
    escorpiao: 'Scorpio',
    sagitario: 'Sagittarius'
  },
  fasesDaLua: {
    nova: 'New',
    crescenteInicio: 'Waxing Crescent',
    crescente: 'Quarter',
    crescenteFinal: 'Waxing Gibbous',
    cheia: 'Full',
    minguanteInicio: 'Waning Gibbous',
    minguante: 'Last Quarter',
    minguanteFinal: 'Waning Crescent'
  },
  comum: {
    formatoDataExtenso: "EEEE, do 'of' MMMM",
    sentimentos: 'Feelings',
    habitos: 'Habits',
    anotacoes: 'Notes',
    editar: 'Edit',
    voltar: 'Back',
    salvar: 'Save'
  },
  mensagensAlerta: {
    registroSucesso: 'The entry was saved successfully',
    registroFalha: 'The entry could not be saved'
  }
}
export default en
