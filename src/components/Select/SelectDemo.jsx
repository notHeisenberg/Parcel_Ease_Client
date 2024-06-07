

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function SelectDemo({ setSelectedRole }) {
    return (
        <Select onValueChange={(value) => { setSelectedRole(value) }}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Register As</SelectLabel>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="deliveryman">Delivery Man</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
