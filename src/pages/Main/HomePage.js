import { VStack } from 'native-base'
import React from 'react'
import Container from '../../components/Container'
import InfoCard from '../../components/HomeComponents/InfoCard'

const HomePage = ({ navigation }) => {

  const data = [
    {
      title: 'Torneo de voleibol',
      description: 'Sábado 26 de noviembre',
      image: 'https://imagenes.elpais.com/resizer/L-x86NTaSVVBr9YZnnn1driudPw=/980x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/CNK6AU3UNFB2REUA4VXS233FKE.jpg'
    },
    {
      title: 'Juegos interclub',
      description: 'del 01 al 07 de diciembre',
      image: 'https://warwick.ac.uk/services/sport/find-your-active.jpg'
    },
    {
      title: 'Torneo de bolas criollas',
      description: 'Viernes 09 de diciembre',
      image: 'https://http2.mlstatic.com/D_NQ_NP_655547-MLV25593228224_052017-O.webp'
    },
    {
      title: 'Torneo de dominó',
      description: 'Lunes 12 de diciembre',
      image: 'https://patasdegallo.com/wp-content/uploads/2016/12/capacidad-mental.jpg'
    },
  ]

  return (
    <Container>
      <VStack
        py={5}
        px={3}
        space={5}
      >
        {data?.map((item, key) => (
          <InfoCard
            key={key}
            title={item.title}
            description={item.description}
            image={item.image}
          />
        ))}
      </VStack>
    </Container>
  )

}

export default HomePage