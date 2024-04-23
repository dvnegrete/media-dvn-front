export interface ListUploadProp {
    listUpload: File[];
    removeType: (file: File) => void;
}