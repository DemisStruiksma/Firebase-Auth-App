interface Props {
	text: string;
	name?: string;
}

const Label = ({ text, name }: Props) => {
	return (
		<label className="block text-sm font-medium text-heading" htmlFor={name}>
			{text}
		</label>
	);
};

export default Label;