import Sentimento from '../entities/Sentimento'
import GetAllSentimentosModelos from '../services/sentimentosModelos/GetAllSentimentosModelos'
import GetUserSentimentos from '../services/user/GetUserSentimentos'

const getSentimentosIniciais = async (
  userId?: string
): Promise<Sentimento[]> => {
  const sentimentos = userId
    ? await new GetUserSentimentos(userId).call()
    : await new GetAllSentimentosModelos().call()
  return sentimentos
}

export default getSentimentosIniciais
