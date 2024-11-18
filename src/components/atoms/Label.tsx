interface Props {
	text: string;
	name?: string;
}

const Label = ({ text, name }: Props) => {
	return (
		<label className="block text-left text-sm font-medium text-body" htmlFor={name}>
			{text}
		</label>
	);
};

export default Label;