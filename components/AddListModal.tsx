import { X, Plus } from "@tamagui/lucide-icons";
import { addList } from '../api/boardService';
import { Adapt, Button, Dialog, Fieldset, Input, Label, Sheet, Unspaced, } from "tamagui";
import { useState } from "react";


interface AddListProps {
    uid: string;
    boardId: string
    onListAdded: () => void;
}

export default function AddList({ uid, boardId, onListAdded }: AddListProps) {
    const [titre, setTitre] = useState<string>('Nouvelle Liste');

    const handleCreateList = async () => {
        await addList(boardId, uid, titre);
        onListAdded();
    };

    return (
        <Dialog modal>
            <Dialog.Trigger asChild>
                <Button color="$gray1Light" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} icon={Plus}>Ajouter une liste</Button>
            </Dialog.Trigger>

            <Adapt
                when="sm"
                platform="touch"
            >
                <Sheet
                    zIndex={200000}
                    modal={true}
                    dismissOnSnapToBottom
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
                    <Dialog.Title>Nouvelle Liste</Dialog.Title>
                    <Dialog.Description>
                        Créer une nouvelle Liste.
                    </Dialog.Description>
                    <Fieldset>
                        <Label htmlFor="name">Nom de la liste</Label>
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
                            aria-label="Close"
                            onPress={handleCreateList}
                        >
                            Créer
                        </Button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    );
}
