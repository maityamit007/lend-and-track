

export const Breadcrumb = ({ items }: { items: string[] }) => {
  return (
    <nav className="flex items-center space-x-2">
      {/* <Home className="w-5 h-5 text-white/80" /> */}
      {items.map((item, index) => (
        <div key={index}>
          <span>{index > 0 && '> '}</span>
          <span
            className={`text-sm font-medium cursor-pointer transition-colors duration-200 hover:text-white ${
              index === items.length - 1 ? "text-white" : "text-white/70"
            }`}
          >
            {item}
          </span>
        </div>
      ))}
    </nav>
  );
};