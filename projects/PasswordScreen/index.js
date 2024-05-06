import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useState} from 'react';

export default function PasswordScreen() {
  const [code, setCode] = useState('123');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f4ef3'}}>
      <View style={style.container}>
        <View style={style.header}>
          <Text style={style.title}>Enter Code</Text>
          <Text style={style.subtitle}>
            We sent a code to{' '}
            <Text style={{color: '#222'}}>+91 8373272738</Text> so please enter
            the code to continue.
          </Text>
        </View>

        {/* form input */}
        <View style={style.form}>
          <View style={style.formInput}>
            {/* input box */}
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
              caretHidden
              keyboardType="number-pad"
              returnKeyType="none"
              onChangeText={value => setCode(value.slice(0, 6))}
              style={style.formInputControl}
              value={code}
            />

            <View style={style.formInputOverflow}>
              {Array.from({length: 6}).map((_, index) => {
                return (
                  <Text key={index} style={style.formInputChar}>
                    {code[index] || (
                      <Text style={style.formInputCharEmpty}>-</Text>
                    )}
                  </Text>
                );
              })}
            </View>
          </View>

          {/* form action */}
          <View style={style.formAction}>
            <TouchableOpacity
              style={style.btn}
              onPress={() => {
                //handle on press
                Alert.alert('code submitted', code);
              }}>
              <Text style={style.btnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* reset link */}
        <TouchableOpacity
          onPress={() => {
            // handle onpress
            Alert.alert('code resend successfully', 'please check your phone');
          }}>
          <Text style={style.formFooter}>
            Did't get the email? <Text style={style.formLink}>Resend code</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    flex: 1,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 20,
    color: '#889797',
    marginBottom: 12,
  },
  header: {
    // paddingHorizontal: 24,
    marginBottom: 10,
  },
  form: {
    flex: 1,
    // paddingHorizontal: 24,
  },
  formInput: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  formInputOverflow: {
    position: 'absolute',
    zIndex: 1,
    top: 1,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  formInputControl: {
    zIndex: 2,
    height: 60,
    color: 'transparent',
    paddingHorizontal: 16,
  },
  formInputChar: {
    flex: 1,
    lineHeight: 60,
    paddingHorizontal: 16,
    fontSize: 34,
    textAlign: 'center',
    fontWeight: '600',
  },
  formInputCharEmpty: {
    color: '#bbb9bc',
    fontWeight: '400',
  },
  formAction: {
    marginVertical: 24,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FD6B68',
    borderColor: '#FD6B68',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  btnText: {
    fontSize: 17,
    lineHeight: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  formFooter: {
    marginTop: 'auto',
    marginBottom: 24,
    paddingHorizontal: 24,
    fontSize: 15,
    lineHeight: 20,
    color: '#9fa5af',
    textAlign: 'center',
  },
  formLink: {
    textAlign: 'right',
    fontWeight: '600',
    color: '#FD6B68',
    textDecorationLine: 'underline',
    textDecorationColor: '#FD6B68',
    textDecorationStyle: 'solid',
  },
});
