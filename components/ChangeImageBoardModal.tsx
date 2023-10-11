import { Image as ImageIcon } from "@tamagui/lucide-icons";
import { addBoard, updateBoardImage } from '../api/boardService';
import { Adapt, Button, Dialog, Fieldset, Progress, Sheet, Image, YStack, } from "tamagui";
import { useEffect, useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../api/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import * as ImageManipulator from 'expo-image-manipulator';
import { useProgress } from '../context/ProgressLoadingContext';





interface EditBoardProps {
    boardId: string
    uid: string;
    triggerLoading: (loading: boolean) => void;
}

export default function ChangeImageBoard({ uid, boardId, triggerLoading }: EditBoardProps) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageName, setSelectedImageName] = useState(null);
    const { setProgress } = useProgress();



    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Permission d\'accès à la bibliothèque média refusée.');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const compressedImage = await ImageManipulator.manipulateAsync(
                result.assets[0].uri,
                [],
                { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
            );
            setSelectedImage(compressedImage.uri);
            setSelectedImageName(result.assets[0].fileName)
        }
    };

    const uploadImageToFirebase = async () => {
        if (selectedImage) {
            const response = await fetch(selectedImage)
            const blob = await response.blob()

            const storageRef = ref(storage, `${uid}/${boardId}/${selectedImageName}`)
            const metadata = {
                contentType: 'image/jpg',
            };
            const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
            triggerLoading(true);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);
                },
                (error) => {
                    console.log("error:" + error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        updateBoardImage(uid, boardId, url)
                    });
                    setTimeout(() => {
                        triggerLoading(false);
                    }, 2000);

                });

        } else {
            console.log('Aucune image sélectionnée.');
        }
    };
    return (
        <Dialog modal>
            <Dialog.Trigger asChild>
                <TouchableOpacity >
                    <ImageIcon color="white"></ImageIcon>
                </TouchableOpacity>
            </Dialog.Trigger>

            <Adapt
                when="sm"
                platform="touch"
            >
                <Sheet
                    zIndex={2000000}
                    modal
                    dismissOnSnapToBottom
                    snapPointsMode={"fit"}
                >
                    <Sheet.Frame
                        padding="$4"
                        space
                    >
                        <Adapt.Contents />
                    </Sheet.Frame>
                    <Sheet.Overlay />
                </Sheet>
            </Adapt>

            <Dialog.Portal>
                <Dialog.Content>
                    <Fieldset>
                        {selectedImage &&
                            <YStack borderRadius={"$2"} marginVertical="$4" alignItems="center">
                                <Image source={{ uri: selectedImage }} style={{ borderRadius: 8, width: 200, height: 200 }} />
                            </YStack>
                        }
                        <Button onPress={pickImage}> Chosir l'image</Button>
                    </Fieldset>


                    <Dialog.Close
                        displayWhenAdapted
                        asChild
                    >
                        <Button
                            backgroundColor={"$green10"}
                            marginBottom="$4"
                            aria-label="Close"
                            onPress={uploadImageToFirebase}
                        >
                            Mettre à jour l'image
                        </Button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    );
}
