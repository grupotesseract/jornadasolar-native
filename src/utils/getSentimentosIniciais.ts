import Sentimento from '../entities/Sentimento'
import GetAllSentimentosModelos from '../services/sentimentosModelos/GetAllSentimentosModelos'

const getSentimentosIniciais = async (): Promise<Sentimento[]> => {
  return await new GetAllSentimentosModelos().call()
}

export default getSentimentosIniciais
