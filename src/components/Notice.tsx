type NoticeProps = {
    children: React.ReactNode;
};

export function Notice(p: NoticeProps) {
    return (
        <div className="my-4 rounded border border-sky-200 bg-sky-100 px-4 pb-2 pt-3">
            {p.children}
        </div>
    );
}
