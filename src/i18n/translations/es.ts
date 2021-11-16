// A ideia é organizar os termos pelo contexto onde eles são usados
const es = {
  nomeApp: 'Jornada Solar',
  errosAuth: {
    emailInvalido: 'E-mail inválido',
    emailJaCadastrado: 'E-mail ya registrado',
    senhaFraca: 'La contraseña debe tener 6 caracteres o más',
    senhaErrada:
      'Contraseña incorrecta. Vuelva a intentarlo o haga clic en "Olvidé mi contraseña" para restablecerla',
    emailNaoEncontrado: 'E-mail no encontrado',
    linkExpirado:
      'El enlace para restablecer la contraseña ha caducado. Haga clic en "Olvidé mi contraseña" en la pantalla de inicio de sesión y vuelva a solicitarla.'
  },
  login: {
    saudacao: '¡Hola! Qué bueno verte por aquí',
    email: 'E-mail',
    senha: 'Contraseña',
    entrar: 'Entrar',
    esqueciSenha: 'Olvidé mi contraseña'
  },
  home: {
    comecarJornada: 'Empezar Jornada',
    tenhoCadastro: 'Ya estoy registrado',
    versao: 'versión',
    frase:
      'Emprende un viaje de autoconocimiento y controla tus hábitos y emociones'
  },
  cadastro: {
    parabens: '¡Hola! Felicitaciones por comenzar tu jornada',
    perguntaNome: 'Para empezar, ¿cómo te gustaría que te llamaran?',
    mudarIdioma: '¿Desea cambiar el idioma?',
    selecioneIdioma: 'Seleccione el idioma',
    continuar: 'Continuar',
    prazerConhecer: 'Es un placer conocerte, %{nome}!',
    perguntaObjetivos: '¿Cuáles son tus principales objetivos?',
    objetivos: {
      autoconhecimento: 'Autoconocimiento',
      habitos: 'Control de los hábitos',
      emocoes: 'Control de las emociones',
      escrever: 'Escribir sobre mi día',
      outros: 'Otros'
    },
    vamosAjudar: 'Genial, ¡te ayudaremos con eso!',
    perguntaSentimentos: '¿Cómo te sientes en este momento?',
    perguntaHabitos: '¿Qué has hecho hoy?',
    faltaUmPasso: '¡Sólo queda un paso!',
    crieCadastro: 'Crea un registro y guarda tus datos',
    email: 'E-mail',
    senha: 'Contraseña',
    perguntaLivro: 'Ya tienes el libro de la Jornada Solar?',
    opcoesLivro: {
      TemLivro: 'Sí, lo tengo.',
      NaoTemLivro: 'No lo tengo.',
      QueroSaberMais: 'No, pero quiero saber más '
    },
    pronto: '¡Eso es todo!'
  },
  recuperarSenha: {
    titulo: '¡Opa! Vamos a controlar esto',
    enviaremosLink:
      'Le enviaremos un enlace por correo electrónico para crear una nueva contraseña.',
    linkEnviado:
      'Se ha enviado un enlace para restablecer tu contraseña a %{email}, busca en tu bandeja de entrada o en el correo no deseado.',
    enviar: 'Enviar'
  },
  menuInferior: {
    registros: 'Registros',
    graficos: 'Gráficos',
    perfil: 'Perfil',
    meditacoes: 'Meditaciones'
  },
  diario: {
    bomDia: 'Buenos días',
    boaTarde: 'Buenas tardes',
    boaNoite: 'Buenas noches',
    mensagem: {
      inicio: 'Hoy el ',
      sol: 'Sol',
      final:
        'está en el signo de %{signo} y la Luna está en la fase %{faseDaLua}.'
    },
    sentimentos: 'Rellenar sentimientos',
    habitos: 'Rellenar hábitos',
    anotacoes: 'Escribe sobre tu día',
    verMais: 'Ver más'
  },
  signos: {
    capricornio: 'Capricornio',
    aquario: 'Acuario',
    peixes: 'Piscis',
    aries: 'Aries',
    touro: 'Taurus',
    gemeos: 'Géminis',
    cancer: 'Cáncer',
    leao: 'Leo',
    virgem: 'Virgo',
    libra: 'Libra',
    escorpiao: 'Escorpio',
    sagitario: 'Sagitario'
  },
  fasesDaLua: {
    nova: 'Nueva',
    crescenteInicio: 'Creciente',
    crescente: 'Creciente',
    crescenteFinal: 'Creciente',
    cheia: 'Llena',
    minguanteInicio: 'Menguante',
    minguante: 'Menguante',
    minguanteFinal: 'Menguante'
  },
  comum: {
    formatoDataExtenso: "EEEE, d 'de' MMMM",
    sentimentos: 'Sentimientos',
    habitos: 'Hábitos',
    anotacoes: 'Anotaciones',
    editar: 'Editar',
    concluir: 'Concluir',
    voltar: 'Volver',
    salvar: 'Guardar',
    nomeGrupoPersonalizado: 'Personalizado'
  },
  mensagensAlerta: {
    registroSucesso: 'Registro completado con éxito',
    registroFalha: 'Registro fallido',
    atualizacaoSucesso: 'El %{tipo} ha sido actualizado con éxito.',
    atualizacaoFalha: 'La actualización de %{tipo} ha fallado.',
    criacaoFalha: 'La creación de %{ttipoype} falló.',
    alteracaoSenhaSucesso: 'La contraseña ha sido cambiada con éxito'
  },
  edicao: {
    tituloEdicao: 'Editando %{tipo}',
    tituloNovo: 'Nuevo %{tipo}',
    novoSentimento: '+ Crear nuevo',
    emoji: 'Emoji',
    sentimento: 'Sentimiento',
    erroEmoji: 'Por favor agregue un emoji',
    erroNome: 'Por favor agregue un nombre',
    novoHabito: 'Nuevo hábito',
    habito: 'Hábito'
  },
  graficos: {
    emocoes: 'Emociones',
    habitos: 'Hábitos',
    textoEmocoes: 'Siga la frecuencia de cada emoción a lo largo del mes:',
    textoHabitos:
      'Estos hábitos han tenido el mayor impacto en tu vida este mes:',
    textoVazio: 'Todavía no hay registros de este mes'
  },
  perfil: {
    editarPerfil: 'Editar Perfil',
    meusDados: 'Mis datos',
    notificacoes: 'Notificaciones',
    ajuda: 'Ayuda',
    textoAjuda:
      '¿Necesita ayuda? Envíe un correo electrónico a jornadasolar@gmail.com',
    sair: 'Salir',
    ok: 'Ok',
    notificaEventos: 'Eventos de la Jornada Solar',
    alterarNome: 'Cambiar nombre',
    alterarSenha: 'Cambiar contraseña',
    nome: 'Nombre',
    senha: 'Contraseña',
    novaSenha: 'Nueva contraseña',
    confirmaSenha: 'Confirma tu nueva contraseña',
    erroConfirmaSenha: 'La confirmación es diferente a la nueva contraseña',
    erroSenhaAtual: 'Contraseña actual incorrecta'
  },
  audio: {
    mensagemErro: 'Hubo un problema con el audio'
  },
  novidade: {
    novo: 'Nuevo'
  },
  notificacoes: {
    tresDias: 'Oye, ha pasado un tiempo. ¿Cómo se siente hoy?',
    canais: {
      geral: 'Eventos de la Jornada Solar',
      novasMeditacoes: 'Nuevas meditaciones'
    }
  }
}
export default es
