import { X, Plus } from "@tamagui/lucide-icons";
import { addCard } from '../api/boardService';
import { Adapt, Button, Dialog, Fieldset, Input, Label, Sheet, SizableText, Unspaced, XStack, } from "tamagui";
import { useState } from "react";
import { TouchableOpacity } from "react-native";


interface AddCardProps {
    uid: string;
    boardId: string
    listId: string
    onCardAdded: () => void;
}

export default function AddCard({ uid, boardId, listId, onCardAdded }: AddCardProps) {
    const [titre, setTitre] = useState<string>('NouvelleCarte');


    const handleCreateCard = async () => {
        await addCard(uid, boardId, listId, titre);
        onCardAdded();
    };

    return (
        <Dialog modal >
            <Dialog.Trigger asChild>
                <TouchableOpacity >
                    <XStack alignItems="baseline" marginVertical={"$2"}>
                        <XStack alignSelf="center">
                            <Plus color="$gray10Light" size="$size.0.75" />
                        </XStack>
                        <SizableText paddingLeft="$1.5" size="$2" theme="alt1">Ajouter une carte</SizableText>
                    </XStack>
                </TouchableOpacity>
            </Dialog.Trigger>

            <Adapt
                when="sm"
                platform="touch"
            >
                <Sheet
                    zIndex={200000}
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
                    <Dialog.Title>Nouvelle carte</Dialog.Title>
                    <Dialog.Description>
                        Créer une nouvelle carte.
                    </Dialog.Description>
                    <Fieldset>
                        <Label htmlFor="name">Titre</Label>
                        <Input
                            id="titre"
                            value={titre}
                            onChangeText={setTitre}
                        />
                    </Fieldset>


                    <Dialog.Close
                        displayWhenAdapted
                        asChild
                    >
                        <Button
                            marginBottom="$4"
                            theme="green_Button"
                            aria-label="Close"
                            onPress={handleCreateCard}
                        >
                            Créer
                        </Button>
                    </Dialog.Close>

                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    );
}
