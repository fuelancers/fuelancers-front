import { Role } from "../../enums"
import { PersonalInfo } from "../experts"
interface TypeReferenceProfile {
    id: number | null
}

export interface IUser {
    email: string,
    firstName: string,
    lastName: string,
    phone: number | null,
    role: Role | null,
    _id: string | null,
    expert: TypeReferenceProfile | null,
    profileInfo: PersonalInfo | null,
    picture: string | null,
    bgPhoto: string | null,
    token: string,
}
