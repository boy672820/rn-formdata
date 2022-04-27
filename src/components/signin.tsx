import axios from '../libs/axios';
import React, {useState} from 'react';
import {Button, View, TextInput, StyleSheet} from 'react-native';

export default function SignIn() {
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onPress = async () => {
    const url = '/auth/login';
    const data = {phone, password};
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    try {
      const response: {data: any} = await axios.post(url, data, {headers});

      axios.defaults.headers.Authorization = `Bearer ${response.data.accessToken}`;
      axios.defaults.headers.Refresh = response.data.accessToken;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="핸드폰 번호"
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="비밀번호"
        onChangeText={setPassword}
      />
      <Button title="저장" color="#f194ff" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {height: 40, margin: 12, borderWidth: 1, padding: 10},
});
