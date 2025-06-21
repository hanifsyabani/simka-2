interface HeaderAdminProps {
  title: string;
}

export default function HeaderAdmin({ title }: HeaderAdminProps) {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 my-4">
        <div className="flex items-center  gap-3">
          <div className="w-2 h-8 bg-blue-950 rounded-full " />
          <h1 className="text-3xl font-semibold">{title}</h1>
        </div>
      </div>
    </>
  );
}
