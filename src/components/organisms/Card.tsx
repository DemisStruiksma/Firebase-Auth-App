interface Props {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
}

function Card({ title, subTitle, children }: Props) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-center">
        <h2 className="text-body text-2xl font-bold">{title}</h2>
        {subTitle && (
          <p className="mt-2 text-sm text-gray-700 text-center">{subTitle}</p>
        )}

        {children}
      </div>
    </div>
  );
}

export default Card;
