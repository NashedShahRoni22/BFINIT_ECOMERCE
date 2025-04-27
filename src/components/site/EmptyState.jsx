const EmptyState = ({ message, description }) => {
  return (
    <div className="mt-10 space-y-2.5 text-center">
      <p className="font-merriweather text-accent font-medium md:text-lg">
        {message}
      </p>
      <p className="italic">{description}</p>
    </div>
  );
};

export default EmptyState;
