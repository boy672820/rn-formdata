import React, {useCallback, useState} from 'react';
import {View, TextInput, Button, Image} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {ImagePickerResponse, MediaType} from 'react-native-image-picker';
import axios from '../libs/axios';

export default function Form() {
  const [pickerResponse, setPickerResponse] = useState<any>(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo' as MediaType,
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, (response: ImagePickerResponse) => {
      setPickerResponse(response);
    });
  }, []);

  const onPress = async () => {
    if (!pickerResponse) {
      return;
    }

    const file = pickerResponse?.assets[0];

    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', content);
    formData.append('files', {
      name: file.fileName,
      type: file.type,
      uri: file.uri.replace('file://', ''),
    });

    const headers = {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwN2JjNzY2N2Y3NTFkZDMwMDhkZDBkODk2N2NkNTQ5NDoxOGRiNTNlNzBlZjQzZDkxMWEiLCJpYXQiOjE2NTEwMjYzMDQsImV4cCI6MTY1MTAyODE2NH0.BAl6FsVsdjUHim75T4sLNj__j92Y0Yk-TC-seF7oYoU',
      Refresh:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNjRiNDk0ZWUxZWU4YTU3MDI0YzQ2NGZiNWI4OTE2Mzo5NzdhIiwiaWF0IjoxNjUxMDI2MzA0LCJleHAiOjE2NTE2MzExMDR9.20528aqqsEQWD2YtX8KVysfxA3_4MnWMkW2Uo_qBgtw',
      'Content-Type': 'multipart/form-data',
    };

    try {
      const response: {data: any} = await axios.post(
        '/board/post/notice',
        formData,
        {headers},
      );

      console.log(response.data);
    } catch (e) {
      console.error(e.response.data.message);
    }
  };

  const uri = pickerResponse?.assets && pickerResponse?.assets[0]?.uri;

  console.log(uri);

  return (
    <View>
      {uri && <Image source={{uri}} style={{width: 100, height: 100}} />}
      <Button title="Choose your image.." onPress={onImageLibraryPress} />
      <TextInput
        style={{height: 40, margin: 12, borderWidth: 1, padding: 10}}
        placeholder="제목"
        onChangeText={setTitle}
      />
      <TextInput
        style={{height: 40, margin: 12, borderWidth: 1, padding: 10}}
        placeholder="내용"
        onChangeText={setContent}
      />
      <Button title="저장" color="#f194ff" onPress={onPress} />
    </View>
  );
}
