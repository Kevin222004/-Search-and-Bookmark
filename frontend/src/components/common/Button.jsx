export const Button = ({
                           children,
                           variant = 'primary',
                           onClick,
                           disabled,
                           className = '',
                           type = 'button'
                       }) => {
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors";
    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-300",
        secondary: "border border-gray-300 hover:bg-gray-50",
        danger: "bg-red-600 text-white hover:bg-red-700"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
};
