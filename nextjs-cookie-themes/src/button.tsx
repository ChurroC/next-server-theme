export function Button({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <button
        >
            Hi
            {children}
        </button>
    );
}