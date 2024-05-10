import {
    TabGroup as HTabGroup,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
} from "@headlessui/react";

interface TabGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    items: {
        label: string;
        content: React.ReactNode;
        isDisabled?: boolean;
    }[];
}

export function TabGroup(p: TabGroupProps) {
    return (
        <HTabGroup className={p.className}>
            <TabList className="flex gap-6 border-b border-b-primary-100 dark:border-b-primary-700">
                {p.items.map((item) => (
                    <Tab
                        disabled={item.isDisabled}
                        className="border-y-2 border-y-white/0 py-1.5 text-primary-500 active:border-b-primary-800 data-[hover]:border-b-primary-200 data-[selected]:border-b-primary-800 data-[hover]:text-primary-800 data-[selected]:text-primary-800 dark:text-primary-400 dark:active:border-b-primary-100 dark:data-[hover]:border-b-primary-400 dark:data-[selected]:border-b-primary-200 dark:data-[hover]:text-primary-200 dark:data-[selected]:text-primary-200"
                    >
                        {item.label}
                    </Tab>
                ))}
            </TabList>
            <TabPanels>
                {p.items.map((item) => (
                    <TabPanel className="pt-4">{item.content}</TabPanel>
                ))}
            </TabPanels>
        </HTabGroup>
    );
}
