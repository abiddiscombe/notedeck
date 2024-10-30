function Banner(
  p: React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
  },
) {
  return (
    <div
      {...p}
      className="bg-orange-300 px-4 py-1.5 text-sm text-primary-800 shadow-inner dark:bg-orange-900 dark:text-white"
    >
      {p.children}
    </div>
  );
}

export default Banner;
