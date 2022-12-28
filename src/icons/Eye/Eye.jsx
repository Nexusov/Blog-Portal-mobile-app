import { Image } from 'react-native'

export const eye = require('./eye.png');

const Eye = () => {
   return (
      <Image source={eye} style={{ width: 23, height: 23}}></Image>
   );
}

export default Eye;

