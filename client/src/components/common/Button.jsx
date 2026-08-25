function Button({
    children,
    type = "button",
    onClick,
    disabled = false,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {children}
        </button>
    );
}

export default Button;