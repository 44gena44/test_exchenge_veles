import clsx from "clsx";

type Props = {
  fileUrl: string | undefined;
  fileType: string | undefined;
  className?: string;
};

export const FilePreview = ({ fileType, fileUrl, className }: Props) => (
  <div className={clsx("overflow-hidden",className)}>
    <div className="relative w-full h-full">
      {fileType?.includes("image") && (
        <img
          src={fileUrl}
          className="center w-full h-full  object-cover"
        />
      )}
      {fileType?.includes("pdf") && (
        <iframe
          src={fileUrl}
          className="center w-full h-full object-cover"
        />
      )}
    </div>
  </div>
);
