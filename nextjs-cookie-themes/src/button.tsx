import { type reactChildren } from './index.d';

export function Button({
    children,
}: reactChildren) {
    return (
        <button>
            Hi
            {children}
        </button>
    );
}