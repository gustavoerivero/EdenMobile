import { useState, useEffect } from 'react'
import NetInfo from '@react-native-community/netinfo'

const useConnection = () => {
  const [isConnected, setIsConnected] = useState(false)

  const recognizeConnection = () => {

      NetInfo.fetch()
        .then(state => {

          console.group(`Connection Details: `)
          console.log(`Connection type: ${state.type}`)
          console.log(`Is connected? ${state.isConnected}`)
          console.groupEnd()

          if (state.isConnected) {
            setIsConnected(true)
          }

          else {
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