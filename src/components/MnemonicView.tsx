import React, {useState} from 'react';
import {View, Text, TextInput, Platform} from 'react-native';
import {Button} from './Button';
import {styles} from '../styles';

interface MnemonicViewProps {
  buildNodeCallback: (mnemonic: string) => void;
}

export const MnemonicView: React.FC<MnemonicViewProps> = ({
  buildNodeCallback,
}) => {
  const androidMnemonic =
    'awkward fox lawn senior flavor cook genuine cake endorse rare walk this';
  const iosMnemonic =
    'absurd aware donate anxiety gather lottery advice document advice choice limb balance';

  const [mnemonic, setMnemonic] = useState(
    Platform.OS === 'android'
      ? androidMnemonic
      : Platform.Version == '17.0'
      ? androidMnemonic
      : iosMnemonic,
  );

  return (
    <View>
      <Text style={styles.boldText}>Enter Mnemonic</Text>
      <TextInput
        multiline
        style={styles.responseBox}
        onChangeText={setMnemonic}
        value={mnemonic}
      />
      {mnemonic != '' && (
        <Button
          title="Start Node"
          onPress={() => buildNodeCallback(mnemonic)}
        />
      )}
    </View>
  );
};
