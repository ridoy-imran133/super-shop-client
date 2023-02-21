import { MenuModel } from "./MenuModel";

export class MenuFormatModel{
    descp: string;
    modId: string;
    role: string;
    scrId: string;
    scrLink: string;
    scrName: string;
    scrParentId: string;
    scrseqNo: string;
    children: MenuModel[];
}