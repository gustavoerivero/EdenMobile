import { useState, useEffect } from 'react'

import NetInfo from '@react-native-community/netinfo'

import { getConnection } from '../services/http'

const useConnection = () => {
  const [isConnected, setIsConnected] = useState(false)

  const recognizeConnection = () => {

    NetInfo.fetch()
      .then(state => {


        if (state.isConnected) {

          getConnection()
            .then(result => {
              let { data } = result

              console.group(`Connection Details: `)
              console.log(`Connection type: ${state.type}`)
              console.log(`Is connected? ${data.conectado}`)
              console.groupEnd()

              setIsConnected(data.conectado)
            })
            .catch(error => {
              console.log(error)
            })
        }

        else {
          console.group(`Connection Details: `)
          console.log(`Connection type: ${state.type}`)
          console.log(`Is connected? ${state.isConnected}`)
          console.groupEnd()
          setIsConnected(false)
        }

      })
      .catch(error => {
        setIsConnected(false)
        console.log(`Connection error: ${error}`)
      })

  }

  useEffect(() => {
    recognizeConnection()
  }, [recognizeConnection])

  return {
    isConnected,
    recognizeConnection
  }
}

export default useConnection