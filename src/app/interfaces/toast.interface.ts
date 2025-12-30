import { ToastType } from "../enums/toast-type.enum";

export interface ToastMessage {
    type: ToastType;
    message: string;
}  