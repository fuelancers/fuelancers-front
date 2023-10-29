import ButtonEdit from "@/components/common/buttons/buttonEdit/buttonEdit.common";

interface IProps {
  data: {
    label: string;
    id?: string;
    onClickEdit?: () => void;
  };
  edit?: boolean;
  icon?: string;
  isOwner?: boolean;
  children: React.ReactNode;
}

export default function ContentBox({
  data,
  edit = true,
  children,
  icon,
  isOwner,
}: IProps) {
  return (
    <div className="content-box md:p-6 mx-auto w-full" id={data.id}>
      <div className="top relative">
        <h4 className="font-bold text-text-100 text-center md:text-lg">
          {data.label}
          {edit && data.onClickEdit && isOwner ? (
            <ButtonEdit
              inline
              showText={false}
              onClick={data.onClickEdit}
              icon={icon}
            />
          ) : null}
        </h4>
        <hr className="separator" />
      </div>
      <div className="body">
        {children}
        <p className="text-sm text-text-90 text-justify"></p>
      </div>
    </div>
  );
}
