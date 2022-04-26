import React, {useCallback, useState} from 'react';
import {View, Text, Button, Image} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {ImagePickerResponse, MediaType} from 'react-native-image-picker';

export default function Form() {
  const [pickerResponse, setPickerResponse] = useState<any>(null);

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

  const uri = pickerResponse?.assets && pickerResponse?.assets[0]?.uri;

  console.log(uri);

  return (
    <View>
      {uri && <Image source={{uri}} style={{width: 100, height: 100}} />}
      <Text>
        <Button title="Choose your image.." onPress={onImageLibraryPress} />
      </Text>
    </View>
  );
}
