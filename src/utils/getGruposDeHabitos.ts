import GrupoDeHabitos, { IGrupoDeHabitos } from '../entities/GrupoDeHabitos'
const gruposDeHabitos = [
  {
    id: 'IdGrupoSocial',
    nome: 'Social',
    posicao: 2,
    habitos: [
      {
        emojiUnicode: [
          '1F468',
          '200D',
          '1F468',
          '200D',
          '1F466',
          '200D',
          '1F466'
        ],
        id: 'IdFamília',
        nome: 'Família',
        posicao: 1
      },
      {
        emojiUnicode: ['1F9D1', '200D', '1F91D', '200D', '1F9D1'],
        id: 'IdAmigos',
        nome: 'Amigos',
        posicao: 2
      },
      {
        emojiUnicode: ['1F468'],
        id: 'IdSozinho',
        nome: 'Sozinho',
        posicao: 3
      },
      {
        emojiUnicode: ['1F57A'],
        id: 'IdEncontro',
        nome: 'Encontro casual',
        posicao: 4
      },
      {
        emojiUnicode: [
          '1F469',
          '200D',
          '2764',
          'FE0F',
          '200D',
          '1F468',
          '1F468',
          '200D',
          '2764',
          'FE0F',
          '200D',
          '1F468'
        ],
        id: 'IdCompanheir',
        nome: 'Companheir@',
        posicao: 5
      },
      {
        emojiUnicode: ['1F4F1'],
        id: 'IdDigital',
        nome: 'Digital',
        posicao: 6
      }
    ]
  },
  {
    id: 'IdGrupoLazer',
    nome: 'Lazer',
    posicao: 3,
    habitos: [
      {
        emojiUnicode: ['2708', 'FE0F'],
        id: 'IdViagem',
        nome: 'Viagem',
        posicao: 1
      },
      {
        emojiUnicode: ['1F3A5'],
        id: 'IdFimes',
        nome: 'Fimes/séries',
        posicao: 2
      },
      {
        emojiUnicode: ['1F4DA'],
        id: 'IdLeitura',
        nome: 'Leitura',
        posicao: 3
      },
      { emojiUnicode: ['1F3AE'], id: 'IdJogos', nome: 'Jogos', posicao: 4 },
      {
        emojiUnicode: ['2600', 'FE0F'],
        id: 'IdAr',
        nome: 'Ar livre',
        posicao: 5
      },
      { emojiUnicode: ['1F60D'], id: 'IdHobby', nome: 'Hobby', posicao: 6 }
    ]
  },
  {
    id: 'IdGrupoAtividade',
    nome: 'Atividade física',
    posicao: 4,
    habitos: [
      { emojiUnicode: ['1F636'], id: 'IdNada', nome: 'Nada', posicao: 1 },
      {
        emojiUnicode: ['1F6B6'],
        id: 'IdCaminhada',
        nome: 'Caminhada',
        posicao: 2
      },
      {
        emojiUnicode: ['1F3C3'],
        id: 'IdEsporte',
        nome: 'Esporte',
        posicao: 3
      },
      {
        emojiUnicode: ['1F646', '200D', '2642', 'FE0F'],
        id: 'IdAlongamentos',
        nome: 'Alongamentos',
        posicao: 4
      },
      {
        emojiUnicode: ['1F4AA'],
        id: 'IdTreino',
        nome: 'Treino intenso',
        posicao: 5
      },
      {
        emojiUnicode: ['1F635'],
        id: 'IdLesionado',
        nome: 'Lesionado',
        posicao: 6
      }
    ]
  },
  {
    id: 'IdGrupoSono',
    nome: 'Sono',
    posicao: 5,
    habitos: [
      {
        emojiUnicode: ['1F634'],
        id: 'IdDormi',
        nome: 'Dormi cedo',
        posicao: 1
      },
      {
        emojiUnicode: ['1F62A'],
        id: 'IdDormi',
        nome: 'Dormi tarde',
        posicao: 2
      },
      {
        emojiUnicode: ['1F60C'],
        id: 'IdDormi',
        nome: 'Dormi bem',
        posicao: 3
      },
      {
        emojiUnicode: ['1F441', 'FE0F'],
        id: 'IdInsônia',
        nome: 'Insônia',
        posicao: 4
      },
      { emojiUnicode: ['1F4AD'], id: 'IdSonho', nome: 'Sonho', posicao: 5 },
      {
        emojiUnicode: ['1F616'],
        id: 'IdPesadelo',
        nome: 'Pesadelo',
        posicao: 6
      }
    ]
  },
  {
    id: 'IdGrupoAlimentação',
    nome: 'Alimentação',
    posicao: 6,
    habitos: [
      {
        emojiUnicode: ['1F951'],
        id: 'IdCaseira',
        nome: 'Caseira',
        posicao: 1
      },
      {
        emojiUnicode: ['1F35F'],
        id: 'IdFast',
        nome: 'Fast food',
        posicao: 2
      },
      {
        emojiUnicode: ['1F35D'],
        id: 'IdRestaurante',
        nome: 'Restaurante',
        posicao: 3
      },
      { emojiUnicode: ['1F357'], id: 'IdCarne', nome: 'Carne', posicao: 4 },
      {
        emojiUnicode: ['1F922'],
        id: 'IdExagerei',
        nome: 'Exagerei',
        posicao: 5
      },
      {
        emojiUnicode: ['1F966'],
        id: 'IdComida',
        nome: 'Comida leve',
        posicao: 6
      }
    ]
  },
  {
    id: 'IdGrupoSaúde',
    nome: 'Saúde',
    posicao: 7,
    habitos: [
      {
        emojiUnicode: ['1F468', '200D', '2695', 'FE0F'],
        id: 'IdMédico',
        nome: 'Médico',
        posicao: 1
      },
      {
        emojiUnicode: ['1F48A'],
        id: 'IdRemédios',
        nome: 'Remédios',
        posicao: 2
      },
      { emojiUnicode: ['1F6B0'], id: 'IdÁgua', nome: 'Água', posicao: 3 },
      {
        emojiUnicode: ['1F9D8'],
        id: 'IdTerapia',
        nome: 'Terapia',
        posicao: 4
      },
      { emojiUnicode: ['2615'], id: 'IdChás', nome: 'Chás', posicao: 5 },
      {
        emojiUnicode: ['1F343'],
        id: 'IdFlorais',
        nome: 'Florais',
        posicao: 6
      }
    ]
  },
  {
    id: 'IdGrupoProfissional',
    nome: 'Profissional',
    posicao: 8,
    habitos: [
      {
        emojiUnicode: ['1F4D3'],
        id: 'IdEstudos',
        nome: 'Estudos',
        posicao: 1
      },
      {
        emojiUnicode: ['1F642'],
        id: 'IdTrabalho',
        nome: 'Trabalho leve',
        posicao: 2
      },
      {
        emojiUnicode: ['1F61F'],
        id: 'IdPressão',
        nome: 'Pressão/tensão',
        posicao: 3
      },
      {
        emojiUnicode: ['1F64B', '200D', '2642', 'FE0F'],
        id: 'IdVoluntariado',
        nome: 'Voluntariado',
        posicao: 4
      },
      {
        emojiUnicode: ['1F9B8', '200D', '2642', 'FE0F'],
        id: 'IdWorkaholic',
        nome: 'Workaholic',
        posicao: 5
      },
      {
        emojiUnicode: ['1F61E'],
        id: 'IdProcrastinei',
        nome: 'Procrastinei',
        posicao: 6
      }
    ]
  },
  {
    id: 'IdGrupoTarefa',
    nome: 'Tarefa',
    posicao: 9,
    habitos: [
      { emojiUnicode: ['1F9F9'], id: 'IdFaxina', nome: 'Faxina', posicao: 1 },
      {
        emojiUnicode: ['1F6A7'],
        id: 'IdReforma',
        nome: 'Reforma',
        posicao: 2
      },
      {
        emojiUnicode: ['1F6D2'],
        id: 'IdCompras',
        nome: 'Compras',
        posicao: 3
      },
      {
        emojiUnicode: ['1F4B2'],
        id: 'IdFinanças',
        nome: 'Finanças',
        posicao: 4
      },
      {
        emojiUnicode: ['1F9FC'],
        id: 'IdLavar',
        nome: 'Lavar roupa',
        posicao: 5
      },
      {
        emojiUnicode: ['1F468', '200D', '1F373'],
        id: 'IdCozinhar',
        nome: 'Cozinhar',
        posicao: 6
      }
    ]
  },
  {
    id: 'IdGrupoSexo',
    nome: 'Sexo',
    posicao: 10,
    habitos: [
      {
        emojiUnicode: ['1F590', 'FE0F'],
        id: 'IdMasturbação',
        nome: 'Masturbação',
        posicao: 1
      },
      {
        emojiUnicode: ['1F34C'],
        id: 'IdUsei',
        nome: 'Usei proteção',
        posicao: 2
      },
      { emojiUnicode: ['1F57A'], id: 'IdCasual', nome: 'Casual', posicao: 3 },
      {
        emojiUnicode: [
          '1F469',
          '200D',
          '2764',
          'FE0F',
          '200D',
          '1F468',
          '1F468',
          '200D',
          '2764',
          'FE0F',
          '200D',
          '1F468'
        ],
        id: 'IdCompanheir',
        nome: 'Companheir@',
        posicao: 4
      },
      { emojiUnicode: ['1F525'], id: 'IdCom', nome: 'Com tesão', posicao: 5 },
      {
        emojiUnicode: ['1F4A6'],
        id: 'IdEjaculei',
        nome: 'Ejaculei',
        posicao: 6
      }
    ]
  },
  {
    id: 'IdGrupoVício',
    nome: 'Vício',
    posicao: 11,
    habitos: [
      {
        emojiUnicode: ['1F6AC'],
        id: 'IdCigarro',
        nome: 'Cigarro',
        posicao: 1
      },
      { emojiUnicode: ['1F377'], id: 'IdÁlcool', nome: 'Álcool', posicao: 2 },
      {
        emojiUnicode: ['1F489'],
        id: 'IdEntorpecente',
        nome: 'Entorpecente',
        posicao: 3
      },
      {
        emojiUnicode: ['1F51E'],
        id: 'IdPornografia',
        nome: 'Pornografia',
        posicao: 4
      },
      { emojiUnicode: ['1F3AE'], id: 'IdJogos', nome: 'Jogos', posicao: 5 },
      {
        emojiUnicode: ['1F4F1'],
        id: 'IdRede',
        nome: 'Rede Social',
        posicao: 6
      }
    ]
  }
]
const getGruposDeHabitosIniciais = () => {
  return gruposDeHabitos.map(grupo => new GrupoDeHabitos(grupo))
}

const getGruposDeHabitosTemplate = (): Array<IGrupoDeHabitos> => {
  return gruposDeHabitos.map(grupo => {
    return { id: grupo.id, nome: grupo.nome, habitos: [] }
  })
}

export { getGruposDeHabitosIniciais, getGruposDeHabitosTemplate }
