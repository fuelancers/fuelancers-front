import ImageUploading, { ImageListType } from "react-images-uploading";
import { useDispatch, useSelector } from "react-redux";

import { AppStore } from "@/storage/store";
import { handleImageUpload } from "@/storage/slice/general.slice";

import "./imageUploader.styles.scss";

interface IProps {
    isMultiple?: boolean;
}

export default function ImageUploader({ isMultiple = true }: IProps) {
    const dispatch = useDispatch();
    const generalStorage = useSelector((store: AppStore) => store.general);
    const maxNumber = 5;

    const onChange = (imageList: ImageListType) => {
        const parse = imageList.map((img) => ({
            data_url: img.data_url,
            file: {
                type: img.file?.type,
                name: img.file?.name,
            },
        }));

        dispatch(handleImageUpload({ imageUpload: parse }));
    };
    return (
        <div>
            <ImageUploading
                multiple={isMultiple}
                value={generalStorage.imageUpload}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        <div
                            className="image-uploader"
                            style={isDragging ? { background: "#dedede" } : {}}
                            {...dragProps}
                        >
                            <button
                                onClick={onImageUpload}
                                className="btn btn-extra"
                                type="button"
                            >
                                Upload photo
                            </button>
                            <button
                                type="button"
                                className="drag-here text-center block text-sm"
                            >
                                Or <br />
                                drag and drop here
                            </button>
                        </div>

                        <div className="content-images-list d-flex gap-2 wrap">
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item shadow-square">
                                    <img
                                        src={image.data_url as string}
                                        alt="Image"
                                        width={100}
                                        height={100}
                                    />
                                    <button
                                        onClick={() => onImageRemove(index)}
                                        className="remove-image shadow-square"
                                    >
                                        <img
                                            src="/assets/icons/close-white-icon.svg"
                                            width={13}
                                            height={13}
                                            alt="Close icon"
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}
