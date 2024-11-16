type ButtonVariant = "primary" | "secondary";

interface Props {
  text: string;
  buttonType: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  variant: ButtonVariant;
  // Custom styling can be added to the button atom, to further customize button and make it more reusable.
  customClassNames?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = ({text, customClassNames, buttonType, variant, onClick}: Props) => {

    // Function to return the right styling based on what button variant is passed on.
    // This is to make this atom more reusable and more scalable for the future. 
    const getButtonStyle = () => {
        switch (variant) {
            case "primary":
                return "bg-primary text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
            // Secondary is just an example in this case, to showcase that multiple variants can be added for different variants.
            case "secondary":
                return "bg-secondary text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1"
        }
    }

    return (
        <button
            type={buttonType}
            className={`rounded-md py-2 ${getButtonStyle()} ${customClassNames}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;