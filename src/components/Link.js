import { Link } from 'native-base'

import colors from '../styled-components/colors'

const StyledLink = ({ url, text }) => {
  return (
    <Link
      _text={{
        color: colors.link.color,
        bold: true
      }}
      isUnderlined={false}
      href={url}
    >
      {text}
    </Link>
  )
}

export default StyledLink