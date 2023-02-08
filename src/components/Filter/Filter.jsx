import { useDispatch } from "react-redux";
import { setFilter } from "redux/filterSlice";
import { Label, LabelName, Input } from "components/Filter/Filter.styled";


export const Filter = () => {
    const dispatch = useDispatch();
    
    const handleFilterChange = event => dispatch(setFilter(event.target.value));

    return (
        <Label>
            <LabelName>
                Find contacts by name
            </LabelName>
            <Input type="text" onChange={handleFilterChange}></Input>
        </Label>
    );
};
