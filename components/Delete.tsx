import { Trash2 } from '@tamagui/lucide-icons'
import { TouchableOpacity } from 'react-native'
import { AlertDialog, Button, XStack, YStack } from 'tamagui'
export function AlertDelete({ onAccept, color }) {

    return (

        <AlertDialog native>

            <AlertDialog.Trigger asChild>

                <TouchableOpacity >
                    <XStack paddingHorizontal="$1" marginVertical="$-0.5">
                        <Trash2 color={color}></Trash2>
                    </XStack>
                </TouchableOpacity>

            </AlertDialog.Trigger>
            <AlertDialog.Portal>

                <AlertDialog.Overlay
                    key="overlay"
                    animation="quick"
                    opacity={0.5}
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                />

                <AlertDialog.Content
                    bordered
                    elevate
                    key="content"
                    animation={[
                        'quick',
                        {
                            opacity: {
                                overshootClamping: true,
                            },
                        },
                    ]}
                    enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                    exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                    x={0}
                    scale={1}
                    opacity={1}
                    y={0}
                >

                    <YStack space>

                        <AlertDialog.Title>Supprimer</AlertDialog.Title>

                        <AlertDialog.Description>

                            La supression est définitive,impossible de revenir en arrière

                        </AlertDialog.Description>
                        <XStack space="$3" justifyContent="flex-end">

                            <AlertDialog.Cancel asChild>

                                <Button>Annuler</Button>

                            </AlertDialog.Cancel>

                            <AlertDialog.Action asChild onPress={onAccept}>

                                <Button theme="active">Supprimer</Button>

                            </AlertDialog.Action>

                        </XStack>

                    </YStack>

                </AlertDialog.Content>

            </AlertDialog.Portal>

        </AlertDialog>

    )

}
