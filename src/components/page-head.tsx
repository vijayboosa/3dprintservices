type PageHeadProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export default function PageHead({
  title,
  description,
  children,
}: Readonly<PageHeadProps>) {
  return (
    <>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {children}
    </>
  );
}
