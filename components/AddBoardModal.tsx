import { Plus } from "@tamagui/lucide-icons";
import { addBoard } from '../api/boardService';
import { Adapt, Button, Dialog, Fieldset, Input, Label, Sheet, } from "tamagui";
import { useState } from "react";


interface AddBoardProps {
    uid: string;
    onBoardAdded: () => void;
}

export default function AddBoard({ uid, onBoardAdded }: AddBoardProps) {
    const [titre, setTitre] = useState<string>('Tableau 1');

    const handleCreateBoard = async () => {
        await addBoard(uid, titre);
        onBoardAdded();
    };

    return (
        <Dialog modal>
            <Dialog.Trigger asChild >
                <Button icon={Plus}></Button>
            </Dialog.Trigger>

            <Adapt
                when="sm"
                platform="touch"
            >
                <Sheet
                    zIndex={2000000}
                    modal
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
                    <Dialog.Title>Nouveau Tableau</Dialog.Title>
                    <Dialog.Description>
                        Créer un nouveau tableaux.
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
                            aria-label="Close"
                            onPress={handleCreateBoard}
                        >
                            Créer
                        </Button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    );
}
