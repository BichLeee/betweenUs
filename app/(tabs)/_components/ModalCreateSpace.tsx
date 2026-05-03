import { Text } from "@/components/ui";
import { Sheet } from "@tamagui/sheet";

export const ModalCreateSpace = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
    return (
        <>
            <Sheet open={open} modal onOpenChange={setOpen} snapPoints={[50]} transition="medium">
                <Sheet.Overlay
                    transition="lazy"
                    background="$shadow6"
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                />

                <Sheet.Handle />
                <Sheet.Frame padding="$4" justifyContent="center" alignItems="center" gap="$5">
                    <Text>
                        Eu officia sunt ipsum nisi dolore labore est laborum laborum in esse ad pariatur. Dolor
                        excepteur esse deserunt voluptate labore ea. Exercitation ipsum deserunt occaecat cupidatat
                        consequat est adipisicing velit cupidatat ullamco veniam aliquip reprehenderit officia. Officia
                        labore culpa ullamco velit. In sit occaecat velit ipsum fugiat esse aliqua dolor sint.
                    </Text>
                </Sheet.Frame>
            </Sheet>
        </>
    );
};
